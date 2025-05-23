import { TipoPropiedad } from '../enums/tipo-propiedad.enum';
import { EstadoConstruccion } from '../enums/estado-construccion.enum';
import { TipoInmueble } from '../enums/tipo-inmueble.enum';

export class PropiedadResponseDTO {
  id: number;
  tipoInmueble: TipoInmueble;
  ubicacion: string;
  precio: number;
  antiguedad: number;
  superficie: number;
  tipo: TipoPropiedad;
  estadoConstruccion: EstadoConstruccion;
  dormitorios: number;
  localidad: string;
  provincia: string;
  imagenes: string[];
  caracteristicas: string[];
}
