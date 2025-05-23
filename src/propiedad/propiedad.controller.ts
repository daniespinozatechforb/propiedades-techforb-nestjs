import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { ImagenService } from 'src/imagen/imagen.service';
import { CreateImagenDto } from 'src/imagen/dto/create-imagen.dto';
import { Imagen } from 'src/imagen/entities/imagen.entity';
import { PropiedadResponseDTO } from './dto/propiedad-response.dto';
import { FilterPropiedadDto } from './interface/PropiedadQueryParams';

@Controller('propiedades')
export class PropiedadController {
  constructor(
    private readonly propiedadService: PropiedadService,
    private readonly imagenService: ImagenService,
  ) {}

  @Post()
  create(@Body() dto: CreatePropiedadDto) {
    return this.propiedadService.create(dto);
  }

  @Post(':id/imagenes')
  async addImagenToPropiedad(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateImagenDto,
  ): Promise<Imagen> {
    return this.imagenService.addImagenToPropiedad(id, dto);
  }

  @Get()
  async getAllFiltered(
    @Query() filters: FilterPropiedadDto,
  ): Promise<PropiedadResponseDTO[]> {
    return this.propiedadService.findFiltered(filters);
  }

  @Get('/all')
  findAll(): Promise<PropiedadResponseDTO[]> {
    return this.propiedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PropiedadResponseDTO> {
    return this.propiedadService.findOne(+id);
  }
}
