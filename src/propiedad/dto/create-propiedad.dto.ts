import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TipoPropiedad } from '../enums/tipo-propiedad.enum';


export class CreatePropiedadDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsEnum(TipoPropiedad)
  tipo: TipoPropiedad;

  @IsNotEmpty()
  @IsNumber()
  localidadId: number;

  @IsNotEmpty()
  @IsNumber()
  provinciaId: number;
}
