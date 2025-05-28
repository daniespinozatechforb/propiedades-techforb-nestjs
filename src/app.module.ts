import { Module } from '@nestjs/common';
import { PropiedadModule } from './propiedad/propiedad.module';
import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenModule } from './imagen/imagen.module';
import { Propiedad } from './propiedad/entities/propiedad.entity';
import { Localidad } from './localidad/entities/localidad.entity';
import { Provincia } from './provincia/entities/provincia.entity';
import { Imagen } from './imagen/entities/imagen.entity';
import { CaracteristicaModule } from './caracteristica/caracteristica.module';
import { Caracteristica } from './caracteristica/entities/caracteristica.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost' /* 'shortline.proxy.rlwy.net', */,
      port: 5432,
      username: 'postgres',
      password: '123456789' /* 'adOfHYHpwlGbYKTDAXODLJBFwpPZBoKv' */,
      database: 'propiedades',
      entities: [Propiedad, Localidad, Provincia, Imagen, Caracteristica],
      synchronize: true,
    }),
    PropiedadModule,
    LocalidadModule,
    ProvinciaModule,
    ImagenModule,
    CaracteristicaModule,
  ],
})
export class AppModule {}
