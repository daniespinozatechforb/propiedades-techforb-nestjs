import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { Provincia } from './entities/provincia.entity';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(dto: CreateProvinciaDto): Promise<Provincia> {
    const provincia = this.provinciaRepository.create(dto);
    return this.provinciaRepository.save(provincia);
  }

  async findAll(): Promise<Provincia[]> {
    return this.provinciaRepository.find({ relations: ['localidades'] });
  }

  async findOne(id: number): Promise<Provincia|null> {//revisar la devolucón de la promesa
    return this.provinciaRepository.findOne({ where: { id }, relations: ['localidades'] });
  }
}
