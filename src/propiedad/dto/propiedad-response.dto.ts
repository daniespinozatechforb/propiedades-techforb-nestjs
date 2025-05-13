import { TipoPropiedad } from "../enums/tipo-propiedad.enum";

export class PropiedadResponseDTO {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  tipo: TipoPropiedad;
  localidad: string;
  provincia: string;
  imagenes: string[];
}
