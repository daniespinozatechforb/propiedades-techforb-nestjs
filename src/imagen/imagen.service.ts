import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { Imagen } from './entities/imagen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Propiedad } from 'src/propiedad/entities/propiedad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagenService {

  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,

    @InjectRepository(Propiedad)
    private readonly propiedadRepository: Repository<Propiedad>,
  ) { }

  /*   async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { id: createImagenDto.propiedadId },
      relations: ['imagenes'],
    });
  
    if (!propiedad) {
      throw new NotFoundException('Propiedad no encontrada');
    }
  
    const imagen = this.imagenRepository.create({
      url: createImagenDto.url,
      propiedad,
    });
  
    return this.imagenRepository.save(imagen);
  } */

  async addImagenToPropiedad(propiedadId: number, dto: CreateImagenDto): Promise<Imagen> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { id: propiedadId },
      relations: ['imagenes'],
    });
    if (!propiedad) throw new NotFoundException('Propiedad no encontrada');

    const imagen = this.imagenRepository.create({ url: dto.url, propiedad });
    return await this.imagenRepository.save(imagen);
  }

}
