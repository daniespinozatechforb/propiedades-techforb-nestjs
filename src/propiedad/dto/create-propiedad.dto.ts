import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { TipoPropiedad } from '../enums/tipo-propiedad.enum';
import { EstadoConstruccion } from '../enums/estado-construccion.enum';
import { TipoInmueble } from '../enums/tipo-inmueble.enum';

export class CreatePropiedadDto {
  @IsNotEmpty()
  @IsEnum(TipoInmueble)
  tipoInmueble: TipoInmueble;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  antiguedad: number;

  @IsNotEmpty()
  @IsNumber()
  superficie: number;

  @IsNotEmpty()
  @IsEnum(TipoPropiedad)
  tipo: TipoPropiedad;

  @IsNotEmpty()
  @IsEnum(EstadoConstruccion)
  estadoConstruccion: EstadoConstruccion;

  @IsNotEmpty()
  @IsNumber()
  dormitorios: number;

  @IsNotEmpty()
  @IsNumber()
  localidadId: number;

  @IsNotEmpty()
  @IsNumber()
  provinciaId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  caracteristicasIds: number[];
}
