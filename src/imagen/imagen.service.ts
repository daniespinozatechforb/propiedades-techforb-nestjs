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
  ) {}
  
  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
  const propiedad = await this.propiedadRepository.findOneBy({ id: createImagenDto.propiedadId });

  if (!propiedad) {
    throw new NotFoundException('Propiedad no encontrada');
  }

  const nuevaImagen = this.imagenRepository.create({
    url: createImagenDto.url,
    propiedad,
  });

  return this.imagenRepository.save(nuevaImagen);
}


  findAll() {
    return `This action returns all imagen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagen`;
  }

  update(id: number, updateImagenDto: UpdateImagenDto) {
    return `This action updates a #${id} imagen`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagen`;
  }
}
