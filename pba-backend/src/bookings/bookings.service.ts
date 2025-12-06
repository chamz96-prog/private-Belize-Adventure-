import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, QuoteBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async quote(dto: QuoteBookingDto) {
    const tour = await this.prisma.tour.findUnique({
      where: { id: dto.tourId },
    });
    if (!tour) throw new NotFoundException('Tour not found');

    const subtotal =
      tour.basePriceAdult * dto.adults +
      (tour.basePriceChild || 0) * dto.children;

    return {
      tourId: tour.id,
      tourTitle: tour.title,
      adults: dto.adults,
      children: dto.children,
      priceAdult: tour.basePriceAdult,
      priceChild: tour.basePriceChild,
      subtotal,
      total: subtotal, // Add tax/fees logic here if needed
      currency: tour.currency,
    };
  }

  async create(dto: CreateBookingDto) {
    const quote = await this.quote({
      tourId: dto.tourId,
      adults: dto.adults,
      children: dto.children,
    });

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { email: dto.guest.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: dto.guest.email,
          name: dto.guest.name,
        },
      });
    }

    const booking = await this.prisma.booking.create({
      data: {
        bookingCode:
          'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: user.id,
        tourId: dto.tourId,
        date: new Date(dto.date),
        adults: dto.adults,
        children: dto.children,
        subtotal: quote.subtotal,
        total: quote.total,
        currency: quote.currency,
        status: 'pending_payment',
        paymentStatus: 'unpaid',
      },
      include: {
        tour: true,
        user: true,
      },
    });

    return booking;
  }

  async findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { tour: true },
    });
  }
}
