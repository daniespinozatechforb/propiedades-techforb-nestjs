import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';

@Controller('propiedades')
export class PropiedadController {
  constructor(private readonly propiedadService: PropiedadService) {}

  @Post()
  create(@Body() dto: CreatePropiedadDto) {
    return this.propiedadService.create(dto);
  }

  @Get()
  findAll() {
    return this.propiedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.propiedadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePropiedadDto) {
    return this.propiedadService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.propiedadService.remove(id);
  }
}
