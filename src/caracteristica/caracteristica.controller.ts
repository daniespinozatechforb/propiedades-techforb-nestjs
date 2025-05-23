import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';

@Controller('caracteristica')
export class CaracteristicaController {
  constructor(private readonly caracteristicaService: CaracteristicaService) {}

  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicaService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caracteristicaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracteristicaService.remove(+id);
  }
}
