import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';

@Controller('localidades')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  @Post()
  create(@Body() dto: CreateLocalidadDto) {
    return this.localidadService.create(dto);
  }

  @Get()
  findAll() {
    return this.localidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.localidadService.findOne(id);
  }
}
