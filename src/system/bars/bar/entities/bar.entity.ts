import { ApiProperty } from '@nestjs/swagger';
import { ColorResolvable, HexColorString, MessageEmbed } from 'discord.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bar {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: '#ffffff' })
  @ApiProperty()
  color: HexColorString;

  @Index()
  @Column({
    name: 'short_name',
    unique: true,
  })
  @ApiProperty()
  shortName: string;
  @Index()
  @Column({
    name: 'unique_name',
    unique: true,
  })
  @ApiProperty()
  uniqueName: string;

  @Column()
  @ApiProperty()
  resume: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  toDiscordEmbeds() {
    const embeds = new MessageEmbed({
      title: `${this.name} - ${this.shortName}`,
      description: this.resume,
      color: this.color,
    });
    return embeds;
  }
}
