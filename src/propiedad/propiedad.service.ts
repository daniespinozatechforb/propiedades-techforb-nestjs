import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { Propiedad } from './entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { PropiedadResponseDTO } from './dto/propiedad-response.dto';


@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,

    @InjectRepository(Localidad)
    private localidadRepository: Repository<Localidad>,

    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
  ) {}

  async create(dto: CreatePropiedadDto): Promise<Propiedad> {
    const localidad = await this.localidadRepository.findOne({ where: { id: dto.localidadId } });
    if (!localidad) throw new Error('Localidad no encontrada');

    const provincia = await this.provinciaRepository.findOne({ where: { id: dto.provinciaId } });
    if (!provincia) throw new Error('Provincia no encontrada');

    const propiedad = this.propiedadRepository.create({
      nombre: dto.nombre,
      ubicacion: dto.ubicacion,
      precio: dto.precio,
      tipo: dto.tipo,
      localidad: localidad,
      provincia: provincia,
    });

    return this.propiedadRepository.save(propiedad);
  }

  async findAll(): Promise<PropiedadResponseDTO[]> {
    const propiedades = await this.propiedadRepository.find({
      relations: ['imagenes', 'localidad', 'provincia'],
    });

    return propiedades.map((prop) => this.toResponseDto(prop));
  }

  async findOne(id: number): Promise<PropiedadResponseDTO> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { id },
      relations: ['imagenes', 'localidad', 'provincia'],
    });

    if (!propiedad) {
      throw new NotFoundException(`Propiedad con id ${id} no encontrada`);
    }

    return this.toResponseDto(propiedad);
  }

  private toResponseDto(prop: Propiedad): PropiedadResponseDTO {
    return {
      id: prop.id,
      nombre: prop.nombre,
      ubicacion: prop.ubicacion,
      precio: prop.precio,
      tipo: prop.tipo,
      localidad: prop.localidad?.nombre || '',
      provincia: prop.provincia?.nombre || '',
      imagenes: prop.imagenes?.map((img) => img.url) || [],
    };
  }


}
