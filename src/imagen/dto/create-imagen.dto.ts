import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImagenDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
