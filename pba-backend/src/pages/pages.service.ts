import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  create(createPageDto: CreatePageDto) {
    const slug = createPageDto.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return this.prisma.page.create({
      data: {
        ...createPageDto,
        slug,
      },
    });
  }

  findAll() {
    return this.prisma.page.findMany();
  }

  findOne(id: number) {
    return this.prisma.page.findUnique({
      where: { id },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.page.findUnique({
      where: { slug },
    });
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
  }

  remove(id: number) {
    return this.prisma.page.delete({
      where: { id },
    });
  }
}
