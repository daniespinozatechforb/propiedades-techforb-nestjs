import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { Localidad } from './entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

@Injectable()
export class LocalidadService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(dto: CreateLocalidadDto): Promise<Localidad> {
    const provincia = await this.provinciaRepository.findOne({
      where: { id: dto.provinciaId },
    });

    if (!provincia) {
      throw new Error('Provincia no encontrada');
    }

    const localidad = this.localidadRepository.create({
      nombre: dto.nombre,
      provincia: provincia,
    });

    return this.localidadRepository.save(localidad);
  }

  async findAll(): Promise<Localidad[]> {
    return this.localidadRepository.find({
      relations: ['provincia', 'propiedades'],
    });
  }

  async findOne(id: number): Promise<Localidad> {
    const localidad = await this.localidadRepository.findOne({
      where: { id },
      relations: ['provincia', 'propiedades'],
    });
    if (!localidad) {
      throw new Error('Localidad no encontrada');
    }
    return localidad;
  }
}
