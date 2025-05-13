import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoPropiedad } from '../enums/tipo-propiedad.enum';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Imagen } from 'src/imagen/entities/imagen.entity';


@Entity()
export class Propiedad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column()
  precio: number;

  @Column({
    type: 'enum',
    enum: TipoPropiedad,
  })
  tipo: TipoPropiedad;

  @ManyToOne(() => Localidad, (localidad) => localidad.propiedades)
  @JoinColumn({ name: 'localidadId' })
  localidad: Localidad;

  @ManyToOne(() => Provincia, (provincia) => provincia.propiedades)
  @JoinColumn({ name: 'provinciaId' })
  provincia: Provincia;

  @OneToMany(() => Imagen, (imagen) => imagen.propiedad, { cascade: true })
  imagenes: Imagen[];

}
