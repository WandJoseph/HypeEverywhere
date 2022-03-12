import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum Element {
  fire = 'fire',
  water = 'water',
  earth = 'earth',
  air = 'air',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  quote: string;
  @ApiProperty()
  @Column({ nullable: true })
  nationality: string;
  @ApiProperty()
  @Column({ nullable: true })
  genre: string;
  @ApiProperty()
  @Column({ nullable: true })
  birthDate: Date;
  @ApiProperty()
  @Column({ nullable: true })
  element: Element;
  @ApiProperty()
  @Column('text', { array: true, default: ['english'] })
  languages: string[];
  @ApiProperty()
  @Column({ nullable: true })
  personality: string;
}
