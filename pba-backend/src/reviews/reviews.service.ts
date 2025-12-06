import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    });
  }

  async findAllByTourId(tourId: number) {
    return this.prisma.review.findMany({
      where: { tourId },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  }
}
