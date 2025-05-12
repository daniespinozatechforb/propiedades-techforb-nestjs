import { Propiedad } from 'src/propiedad/entities/propiedad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';


@Entity()
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Provincia, (provincia) => provincia.localidades, { eager: true })
  provincia: Provincia;

  @OneToMany(() => Propiedad, (propiedad) => propiedad.localidad)
  propiedades: Propiedad[];
}
