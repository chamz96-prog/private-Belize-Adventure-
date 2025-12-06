import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller()
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get('tours')
  findAll() {
    return this.toursService.findAll();
  }

  @Get('tours/:slug')
  findOne(@Param('slug') slug: string) {
    return this.toursService.findOne(slug);
  }

  @Get('admin/tours/:id')
  findOneById(@Param('id') id: string) {
    return this.toursService.findOneById(+id);
  }

  @Post('admin/tours')
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Put('admin/tours/:id')
  async update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    try {
      return await this.toursService.update(+id, updateTourDto);
    } catch (error) {
      console.error('Update error:', error);
      throw new HttpException(error.message || 'Failed to update tour', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('admin/tours/:id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
