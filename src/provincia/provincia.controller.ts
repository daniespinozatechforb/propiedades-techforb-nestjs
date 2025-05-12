import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';

@Controller('provincias')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Post()
  create(@Body() dto: CreateProvinciaDto) {
    return this.provinciaService.create(dto);
  }

  @Get()
  findAll() {
    return this.provinciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.provinciaService.findOne(id);
  }
}
