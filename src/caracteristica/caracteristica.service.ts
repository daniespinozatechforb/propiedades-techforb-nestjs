import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caracteristica } from './entities/caracteristica.entity';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';

@Injectable()
export class CaracteristicaService {
  constructor(
    @InjectRepository(Caracteristica)
    private readonly caracteristicaRepository: Repository<Caracteristica>,
  ) {}

  async create(createCaracteristicaDto: CreateCaracteristicaDto) {
    const caracteristica = this.caracteristicaRepository.create(
      createCaracteristicaDto,
    );
    return this.caracteristicaRepository.save(caracteristica);
  }

  findAll() {
    return this.caracteristicaRepository.find();
  }

  findOne(id: number) {
    return this.caracteristicaRepository.findOneBy({ id });
  }

  async update(id: number, updateCaracteristicaDto: UpdateCaracteristicaDto) {
    await this.caracteristicaRepository.update(id, updateCaracteristicaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const toDelete = await this.findOne(id);
    await this.caracteristicaRepository.delete(id);
    return toDelete;
  }
}
