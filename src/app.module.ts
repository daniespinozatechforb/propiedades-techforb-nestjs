import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropiedadModule } from './propiedad/propiedad.module';
import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenModule } from './imagen/imagen.module';
import { Propiedad } from './propiedad/entities/propiedad.entity';
import { Localidad } from './localidad/entities/localidad.entity';
import { Provincia } from './provincia/entities/provincia.entity';
import { Imagen } from './imagen/entities/imagen.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'propiedades',
      entities: [Propiedad, Localidad, Provincia, Imagen],
      synchronize: true, // Solo en desarrollo
    }),
    PropiedadModule,
    LocalidadModule,
    ProvinciaModule,
    ImagenModule,
  ],
})
export class AppModule {}