import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { Propiedad } from './entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';


@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,

    @InjectRepository(Localidad)
    private localidadRepository: Repository<Localidad>,

    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
  ) {}

  async create(dto: CreatePropiedadDto): Promise<Propiedad> {
    const localidad = await this.localidadRepository.findOne({ where: { id: dto.localidadId } });
    if (!localidad) throw new Error('Localidad no encontrada');

    const provincia = await this.provinciaRepository.findOne({ where: { id: dto.provinciaId } });
    if (!provincia) throw new Error('Provincia no encontrada');

    const propiedad = this.propiedadRepository.create({
      nombre: dto.nombre,
      ubicacion: dto.ubicacion,
      precio: dto.precio,
      tipo: dto.tipo,
      imagenUrl: dto.imagenUrl,
      localidad: localidad,
      provincia: provincia,
    });

    return this.propiedadRepository.save(propiedad);
  }

  async findAll(): Promise<Propiedad[]> {
    return this.propiedadRepository.find({ relations: ['localidad', 'provincia'] });
  }

  async findOne(id: number): Promise<Propiedad> {
    const propiedad = await this.propiedadRepository.findOne({ where: { id }, relations: ['localidad', 'provincia'] });
    if (!propiedad) throw new Error('Propiedad no encontrada');
    return propiedad;
  }

  async update(id: number, dto: UpdatePropiedadDto): Promise<Propiedad> {
    const propiedad = await this.findOne(id);

    if (dto.nombre) propiedad.nombre = dto.nombre;
    if (dto.ubicacion) propiedad.ubicacion = dto.ubicacion;
    if (dto.precio) propiedad.precio = dto.precio;
    if (dto.tipo) propiedad.tipo = dto.tipo;
    if (dto.imagenUrl) propiedad.imagenUrl = dto.imagenUrl;

    if (dto.localidadId) {
      const localidad = await this.localidadRepository.findOne({ where: { id: dto.localidadId } });
      if (!localidad) throw new Error('Localidad no encontrada');
      propiedad.localidad = localidad;
    }

    if (dto.provinciaId) {
      const provincia = await this.provinciaRepository.findOne({ where: { id: dto.provinciaId } });
      if (!provincia) throw new Error('Provincia no encontrada');
      propiedad.provincia = provincia;
    }

    return this.propiedadRepository.save(propiedad);
  }

  async remove(id: number): Promise<void> {
    const propiedad = await this.findOne(id);
    await this.propiedadRepository.remove(propiedad);
  }
}
