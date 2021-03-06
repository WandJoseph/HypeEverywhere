import { ApiProperty } from '@nestjs/swagger';
import { MessageEmbed } from 'discord.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;
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
  @Column({ type: 'text', nullable: true })
  // @ApiProperty()
  // description: string;
  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toDiscordEmbeds() {
    const embeds = new MessageEmbed({
      title: `${this.name} - ${this.shortName}`,
      description: this.resume,
    });
    return embeds;
  }
}
