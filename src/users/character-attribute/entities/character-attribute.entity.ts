import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CharacterAttribute {
  @PrimaryColumn()
  @ApiProperty()
  characterId: number;

  @PrimaryColumn()
  @ApiProperty()
  attributeId: number;

  name?: string;
  shortName?: string;

  @Column({ default: 11 })
  @ApiProperty()
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
