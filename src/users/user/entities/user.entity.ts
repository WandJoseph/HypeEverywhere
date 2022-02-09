import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  health: number;

  @Column({ name: 'max_health', default: 0 })
  maxHealth: number;

  @Column({ default: [] })
  conditions: string;
}
