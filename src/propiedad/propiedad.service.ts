import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { Propiedad } from './entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { PropiedadResponseDTO } from './dto/propiedad-response.dto';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { FilterPropiedadDto } from './interface/PropiedadQueryParams';

@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad)
    private propiedadRepository: Repository<Propiedad>,

    @InjectRepository(Localidad)
    private localidadRepository: Repository<Localidad>,

    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,

    @InjectRepository(Caracteristica)
    private caracteristicaRepository: Repository<Caracteristica>,
  ) {}

  async create(dto: CreatePropiedadDto): Promise<Propiedad> {
    const localidad = await this.localidadRepository.findOne({
      where: { id: dto.localidadId },
    });
    if (!localidad) throw new Error('Localidad no encontrada');

    const provincia = await this.provinciaRepository.findOne({
      where: { id: dto.provinciaId },
    });
    if (!provincia) throw new Error('Provincia no encontrada');

    const caracteristicas = await this.caracteristicaRepository.findByIds(
      dto.caracteristicasIds,
    );
    if (caracteristicas.length !== dto.caracteristicasIds.length) {
      throw new Error('Una o más características no fueron encontradas');
    }

    const propiedad = this.propiedadRepository.create({
      tipoInmueble: dto.tipoInmueble,
      ubicacion: dto.ubicacion,
      precio: dto.precio,
      antiguedad: dto.antiguedad,
      superficie: dto.superficie,
      tipo: dto.tipo,
      estadoConstruccion: dto.estadoConstruccion,
      dormitorios: dto.dormitorios,
      localidad,
      provincia,
      caracteristicas,
    });

    return this.propiedadRepository.save(propiedad);
  }

  async findFiltered(
    filterDto: FilterPropiedadDto,
  ): Promise<PropiedadResponseDTO[]> {
    const query = this.propiedadRepository
      .createQueryBuilder('propiedad')
      .leftJoinAndSelect('propiedad.imagenes', 'imagenes')
      .leftJoinAndSelect('propiedad.localidad', 'localidad')
      .leftJoinAndSelect('propiedad.provincia', 'provincia')
      .leftJoinAndSelect('propiedad.caracteristicas', 'caracteristicas');

    if (filterDto.tipoInmueble) {
      query.andWhere('propiedad.tipoInmueble = :tipoInmueble', {
        tipoInmueble: filterDto.tipoInmueble,
      });
    }

    if (filterDto.tipo) {
      query.andWhere('propiedad.tipo = :tipo', {
        tipo: filterDto.tipo,
      });
    }

    if (filterDto.precioMax) {
      query.andWhere('propiedad.precio <= :precioMax', {
        precioMax: filterDto.precioMax,
      });
    }

    if (filterDto.dormitorios !== undefined) {
      query.andWhere('propiedad.dormitorios = :dormitorios', {
        dormitorios: filterDto.dormitorios,
      });
    }

    if (filterDto.ubicacion) {
      query.andWhere(
        '(LOWER(localidad.nombre) LIKE LOWER(:ubicacion) OR LOWER(provincia.nombre) LIKE LOWER(:ubicacion))',
        {
          ubicacion: `%${filterDto.ubicacion}%`,
        },
      );
    }

    const propiedades = await query.getMany();
    return propiedades.map((prop) => this.toResponseDto(prop));
  }

  async findAll(): Promise<PropiedadResponseDTO[]> {
    const propiedades = await this.propiedadRepository.find({
      relations: ['imagenes', 'localidad', 'provincia', 'caracteristicas'],
    });

    return propiedades.map((prop) => this.toResponseDto(prop));
  }

  async findOne(id: number): Promise<PropiedadResponseDTO> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { id },
      relations: ['imagenes', 'localidad', 'provincia', 'caracteristicas'],
    });

    if (!propiedad) {
      throw new NotFoundException(`Propiedad con id ${id} no encontrada`);
    }

    return this.toResponseDto(propiedad);
  }

  private toResponseDto(prop: Propiedad): PropiedadResponseDTO {
    return {
      id: prop.id,
      tipoInmueble: prop.tipoInmueble,
      ubicacion: prop.ubicacion,
      precio: prop.precio,
      antiguedad: prop.antiguedad,
      superficie: prop.superficie,
      tipo: prop.tipo,
      estadoConstruccion: prop.estadoConstruccion,
      dormitorios: prop.dormitorios,
      localidad: prop.localidad?.nombre || '',
      provincia: prop.provincia?.nombre || '',
      imagenes: prop.imagenes?.map((img) => img.url) || [],
      caracteristicas: prop.caracteristicas?.map((c) => c.nombre) || [],
    };
  }
}
