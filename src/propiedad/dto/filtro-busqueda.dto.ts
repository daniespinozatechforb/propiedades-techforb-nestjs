import { IsOptional, IsString } from 'class-validator';

export class FiltrosBusquedaDto {
  @IsOptional()
  @IsString()
  tipoOperacion?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  tipoPropiedad?: string;

  @IsOptional()
  @IsString()
  ambientes?: string;

  @IsOptional()
  @IsString()
  precio?: string;
}
