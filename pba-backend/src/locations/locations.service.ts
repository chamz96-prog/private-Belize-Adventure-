import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  create(createLocationDto: CreateLocationDto) {
    const slug = createLocationDto.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return this.prisma.location.create({
      data: {
        ...createLocationDto,
        slug,
      },
    });
  }

  findAll() {
    return this.prisma.location.findMany({
      include: {
        children: true,
        parent: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.location.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  remove(id: number) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
