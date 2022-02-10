import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;
}
