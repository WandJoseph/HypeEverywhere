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

// Improvisation / Beginner / Skillful / Graduate / Master
export enum TechniqueProficiency {
  Improvisation = 'improvisation',
  Beginner = 'beginner',
  Skillful = 'skillful',
  Graduate = 'graduate',
  Master = 'master',
  Special = 'special',
}

const portugueseProficiency = {
  improvisation: 'Improvisação',
  beginner: 'Iniciante',
  skillful: 'Hábil',
  graduate: 'Graduado',
  master: 'Mestre',
  special: 'Especial',
};

@Entity()
export class Technique {
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

  @Column()
  @ApiProperty()
  description: string;

  @Column({
    default: TechniqueProficiency.Master,
  })
  @ApiProperty()
  proficiencyLimit: TechniqueProficiency;

  // acessibility
  // cost
  // roll
  // effects

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  categories?: string[];

  toDiscordEmbeds() {
    const embeds = new MessageEmbed({
      title: `${this.name} `,
      description: this.description,
      fields: [
        {
          name: 'Proficiência Máxima',
          value: portugueseProficiency[this.proficiencyLimit],
        },
        {
          name: 'Categories',
          value: this.categories?.join(', ') || 'Sem Categorias',
        },
      ],
    });
    return embeds;
  }
}
