import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Propiedad } from '../../propiedad/entities/propiedad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';

@Entity()
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Propiedad, (propiedad) => propiedad.provincia)
  propiedades: Propiedad[];

  @OneToMany(() => Localidad, (localidad) => localidad.provincia)
  localidades: Localidad[];
}
