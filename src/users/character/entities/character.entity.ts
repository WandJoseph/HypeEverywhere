import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attribute } from '~/system/attributes/attribute/entities/attribute.entity';

export enum Element {
  Fire = 'Fire',
  Water = 'Water',
  Earth = 'earth',
  Air = 'air',
  Lightning = 'lightning',
}

@Entity()
export class Character {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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

  attributes: Attribute[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
