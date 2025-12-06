import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.tour.findMany({
      where: { isActive: true },
      include: {
        images: true,
        location: true,
      }
    });
  }

  findOne(slug: string) {
    return this.prisma.tour.findUnique({
      where: { slug },
      include: {
        images: true,
        itinerary: { orderBy: { day: 'asc' } },
        inclusions: true,
        exclusions: true,
        location: true,
        options: {
          include: {
            schedules: {
              include: {
                pricingTiers: true
              }
            }
          }
        }
      }
    });
  }

  findOneById(id: number) {
    return this.prisma.tour.findUnique({
      where: { id },
      include: {
        images: true,
        itinerary: { orderBy: { day: 'asc' } },
        inclusions: true,
        exclusions: true,
        location: true,
        options: {
          include: {
            schedules: {
              include: {
                pricingTiers: true
              }
            }
          }
        }
      }
    });
  }

  async create(createTourDto: CreateTourDto) {
    try {
      console.log('Creating tour with payload:', JSON.stringify(createTourDto, null, 2));
      const slug = createTourDto.slug || createTourDto.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      
      const { images, itinerary, inclusions, exclusions, faqs, surroundings, options, ...tourData } = createTourDto;
      
      const result = await this.prisma.tour.create({
        data: {
          ...tourData,
          slug,
          images: images ? {
            create: images.map((url, index) => ({ url, order: index }))
          } : undefined,
          itinerary: itinerary ? {
            create: itinerary
          } : undefined,
          inclusions: inclusions ? {
            create: inclusions.map(item => ({ item }))
          } : undefined,
          exclusions: exclusions ? {
            create: exclusions.map(item => ({ item }))
          } : undefined,
          faqs: faqs ? {
            create: faqs
          } : undefined,
          surroundings: surroundings ? {
            create: surroundings
          } : undefined,
          options: options ? {
            create: options.map(opt => ({
              code: opt.code,
              name: opt.name,
              description: opt.description,
              type: opt.type,
              isDefault: opt.isDefault,
              includesTransportation: opt.includesTransportation,
              includesTransfers: opt.includesTransfers,
              includesEntranceFees: opt.includesEntranceFees,
              currency: opt.currency,
              isActive: opt.isActive,
              schedules: {
                create: opt.schedules.map(sch => ({
                  startDate: sch.startDate,
                  endDate: sch.endDate,
                  daysOfWeek: sch.daysOfWeek.join(','),
                  startTime: sch.startTime,
                  durationHours: sch.durationHours,
                  pricingTiers: {
                    create: sch.pricingTiers
                  }
                }))
              }
            }))
          } : undefined,
        },
        include: {
          images: true,
          itinerary: true,
          inclusions: true,
          exclusions: true,
          location: true,
          faqs: true,
          surroundings: true,
          options: {
            include: {
              schedules: {
                include: {
                  pricingTiers: true
                }
              }
            }
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Error creating tour:', error);
      throw error;
    }
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const { images, itinerary, inclusions, exclusions, faqs, surroundings, options, ...tourData } = updateTourDto;

    return this.prisma.$transaction(async (prisma) => {
      if (images) {
        await prisma.tourImage.deleteMany({ where: { tourId: id } });
        await prisma.tourImage.createMany({
          data: images.map((url, index) => ({ tourId: id, url, order: index }))
        });
      }
      
      if (itinerary) {
        await prisma.itineraryItem.deleteMany({ where: { tourId: id } });
        await prisma.itineraryItem.createMany({
          data: itinerary.map(item => ({ ...item, tourId: id }))
        });
      }

      if (inclusions) {
        await prisma.tourInclusion.deleteMany({ where: { tourId: id } });
        await prisma.tourInclusion.createMany({
          data: inclusions.map(item => ({ item, tourId: id }))
        });
      }

      if (exclusions) {
        await prisma.tourExclusion.deleteMany({ where: { tourId: id } });
        await prisma.tourExclusion.createMany({
          data: exclusions.map(item => ({ item, tourId: id }))
        });
      }

      if (faqs) {
        await prisma.tourFaq.deleteMany({ where: { tourId: id } });
        await prisma.tourFaq.createMany({
          data: faqs.map(item => ({ ...item, tourId: id }))
        });
      }

      if (surroundings) {
        await prisma.tourSurrounding.deleteMany({ where: { tourId: id } });
        await prisma.tourSurrounding.createMany({
          data: surroundings.map(item => ({ ...item, tourId: id }))
        });
      }

      if (options) {
        await prisma.tourOption.deleteMany({ where: { tourId: id } });
        // We cannot use createMany for nested relations, so we iterate
        for (const opt of options) {
          await prisma.tourOption.create({
            data: {
              tourId: id,
              code: opt.code,
              name: opt.name,
              description: opt.description,
              type: opt.type,
              isDefault: opt.isDefault,
              includesTransportation: opt.includesTransportation,
              includesTransfers: opt.includesTransfers,
              includesEntranceFees: opt.includesEntranceFees,
              currency: opt.currency,
              isActive: opt.isActive,
              schedules: {
                create: opt.schedules.map(sch => ({
                  startDate: sch.startDate,
                  endDate: sch.endDate,
                  daysOfWeek: sch.daysOfWeek.join(','),
                  startTime: sch.startTime,
                  durationHours: sch.durationHours,
                  pricingTiers: {
                    create: sch.pricingTiers
                  }
                }))
              }
            }
          });
        }
      }

      return prisma.tour.update({
        where: { id },
        data: tourData,
        include: {
          images: true,
          itinerary: true,
          inclusions: true,
          exclusions: true,
          location: true,
          faqs: true,
          surroundings: true,
          options: {
            include: {
              schedules: {
                include: {
                  pricingTiers: true
                }
              }
            }
          }
        }
      });
    });
  }

  remove(id: number) {
    return this.prisma.tour.delete({
      where: { id },
    });
  }
}
