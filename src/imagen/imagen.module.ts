import { Module } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { ImagenController } from './imagen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { Propiedad } from '../propiedad/entities/propiedad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Imagen, Propiedad]),
  ],
  controllers: [ImagenController],
  providers: [ImagenService],
})
export class ImagenModule {}
