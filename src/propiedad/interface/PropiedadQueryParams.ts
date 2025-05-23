import { IsEnum, IsOptional } from 'class-validator';
import { TipoInmueble } from '../enums/tipo-inmueble.enum';
import { TipoPropiedad } from '../enums/tipo-propiedad.enum';

export class FilterPropiedadDto {
  @IsOptional()
  @IsEnum(TipoInmueble)
  tipoInmueble?: TipoInmueble;

  @IsOptional()
  @IsEnum(TipoPropiedad)
  tipo?: TipoPropiedad;

  @IsOptional()
  precioMax?: number;

  @IsOptional()
  dormitorios?: number;

  @IsOptional()
  ubicacion?: string;
}
