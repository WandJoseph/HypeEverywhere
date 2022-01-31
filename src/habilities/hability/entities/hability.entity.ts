import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ name: 'unique_name' })
  uniqueName: string;

  // Level
}
