import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum Element {
  fire = 'fire',
  water = 'water',
  earth = 'earth',
  air = 'air',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column('text', { nullable: true })
  quote: string;

  @Column({ nullable: true })
  nationality: string;
  @Column({ nullable: true })
  genre: string;
  @Column({ nullable: true })
  birthDate: Date;
  element: Element;
  @Column('text', { array: true, default: ['english'] })
  languages: string[];

  @Column({ nullable: true })
  personality: string;
}
