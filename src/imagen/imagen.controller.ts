import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';

@Controller('imagen')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

}
