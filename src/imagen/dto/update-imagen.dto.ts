import { IsOptional, IsString } from 'class-validator';

export class UpdateImagenDto {
  @IsOptional()
  @IsString()
  url?: string;
}
