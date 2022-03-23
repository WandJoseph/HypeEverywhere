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
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;
  @Index()
  @Column({
    name: 'unique_name',
    unique: true,
  })
  @ApiProperty()
  uniqueName: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toDiscordEmbeds() {
    const embeds = new MessageEmbed({
      title: `${this.name} `,
      description: this.description,
      fields: [],
    });
    return embeds;
  }
}
