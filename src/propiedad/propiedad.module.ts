import { Module } from '@nestjs/common';
import { PropiedadService } from './propiedad.service';
import { PropiedadController } from './propiedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { ImagenModule } from 'src/imagen/imagen.module';


@Module({
  imports: [TypeOrmModule.forFeature([Propiedad, Localidad, Provincia]),ImagenModule],
  providers: [PropiedadService],
  controllers: [PropiedadController],
})
export class PropiedadModule {}
