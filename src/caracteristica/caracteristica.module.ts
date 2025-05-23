import { Module } from '@nestjs/common';
import { CaracteristicaService } from './caracteristica.service';
import { CaracteristicaController } from './caracteristica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';

@Module({
  controllers: [CaracteristicaController],
  providers: [CaracteristicaService],
  imports: [TypeOrmModule.forFeature([Caracteristica])],
  exports: [TypeOrmModule],
})
export class CaracteristicaModule {}
