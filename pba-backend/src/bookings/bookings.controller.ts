import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, QuoteBookingDto } from './dto/create-booking.dto';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('bookings/quote')
  quote(@Body() dto: QuoteBookingDto) {
    return this.bookingsService.quote(dto);
  }

  @Post('bookings')
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get('me/bookings')
  findMyBookings(@Query('userId') userId: string) {
    // For localhost test, we pass userId as query param
    return this.bookingsService.findByUser(+userId);
  }
}
