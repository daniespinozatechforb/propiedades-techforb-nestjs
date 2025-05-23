// caracteristica.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Propiedad } from 'src/propiedad/entities/propiedad.entity';

@Entity()
export class Caracteristica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Propiedad, (propiedad) => propiedad.caracteristicas)
  propiedades: Propiedad[];
}
