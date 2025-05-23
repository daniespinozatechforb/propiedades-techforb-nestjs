import { Module } from '@nestjs/common';
import { PropiedadService } from './propiedad.service';
import { PropiedadController } from './propiedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { ImagenModule } from 'src/imagen/imagen.module';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { CaracteristicaModule } from 'src/caracteristica/caracteristica.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Propiedad, Localidad, Provincia, Caracteristica]),
    ImagenModule,
    CaracteristicaModule,
  ],
  providers: [PropiedadService],
  controllers: [PropiedadController],
})
export class PropiedadModule {}
