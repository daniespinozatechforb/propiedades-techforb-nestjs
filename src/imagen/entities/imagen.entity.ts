import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Propiedad } from '../../propiedad/entities/propiedad.entity';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Propiedad, (propiedad) => propiedad.imagenes, { onDelete: 'CASCADE' })
  propiedad: Propiedad;
}
