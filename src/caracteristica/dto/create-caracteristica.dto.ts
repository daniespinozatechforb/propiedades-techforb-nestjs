import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCaracteristicaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
