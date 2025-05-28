import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadService } from './localidad.service';
import { LocalidadController } from './localidad.controller';
import { Localidad } from './entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localidad, Provincia])],
  controllers: [LocalidadController],
  providers: [LocalidadService],
  exports: [LocalidadService],
})
export class LocalidadModule {}
