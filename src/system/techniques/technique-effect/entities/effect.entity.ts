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
export class Effect {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  techniqueId: number;

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

  @Column('text')
  @ApiProperty()
  description?: string;

  @Column({ nullable: true })
  @ApiProperty()
  nh?: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toString(): string {
    return `Nome: ${this.name}
    Descrição: ${this.description}
    NH: ${this.nh}`;
  }

  toDiscordEmbeds() {
    return [
      new MessageEmbed({
        title: this.name,
        description: `${this.description}`,
        fields: [
          {
            name: 'Rolagem',
            value: this.nh,
          },
        ],
      }),
    ];
  }
}
