import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TipoPropiedad } from '../enums/tipo-propiedad.enum';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Imagen } from 'src/imagen/entities/imagen.entity';
import { Caracteristica } from 'src/caracteristica/entities/caracteristica.entity';
import { EstadoConstruccion } from '../enums/estado-construccion.enum';
import { TipoInmueble } from '../enums/tipo-inmueble.enum';

@Entity()
export class Propiedad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoInmueble,
  })
  tipoInmueble: TipoInmueble;

  @Column()
  ubicacion: string;

  @Column()
  antiguedad: number;

  @Column()
  superficie: number;

  @Column()
  precio: number;

  @Column({
    type: 'enum',
    enum: TipoPropiedad,
  })
  tipo: TipoPropiedad;

  @Column({
    type: 'enum',
    enum: EstadoConstruccion,
  })
  estadoConstruccion: EstadoConstruccion;

  @Column()
  dormitorios: number;

  @ManyToOne(() => Localidad, (localidad) => localidad.propiedades)
  @JoinColumn({ name: 'localidadId' })
  localidad: Localidad;

  @ManyToOne(() => Provincia, (provincia) => provincia.propiedades)
  @JoinColumn({ name: 'provinciaId' })
  provincia: Provincia;

  @OneToMany(() => Imagen, (imagen) => imagen.propiedad, { cascade: true })
  imagenes: Imagen[];

  @ManyToMany(
    () => Caracteristica,
    (caracteristica) => caracteristica.propiedades,
    { cascade: true },
  )
  @JoinTable()
  caracteristicas: Caracteristica[];
}
