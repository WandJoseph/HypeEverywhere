import { ApiProperty } from '@nestjs/swagger';
import { APIEmbedField } from 'discord-api-types';
import { MessageEmbed } from 'discord.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Effect } from '../../technique-effect/entities/effect.entity';

// Improvisation / Beginner / Skillful / Graduate / Master
export enum TechniqueProficiency {
  Improvisation = 'improvisation',
  Beginner = 'beginner',
  Skillful = 'skillful',
  Graduate = 'graduate',
  Master = 'master',
  Special = 'special',
}
export enum TechniqueDifficulty {
  Easy = 'easy',
  Normal = 'normal',
  Medium = 'medium',
  Difficult = 'difficult',
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
const portugueseDifficulty = {
  easy: 'Fácil',
  normal: 'Normal',
  medium: 'Médio',
  difficult: 'Difícil',
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

  @Column({
    default: TechniqueDifficulty.Medium,
  })
  @ApiProperty()
  difficulty: TechniqueDifficulty;

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
  effects?: Effect[];

  toDiscordEmbeds() {
    const effects: MessageEmbed[] = this.effects.map((effect) => {
      const embed = effect.toDiscordEmbeds()[0];
      embed.setTitle(embed.title + ' (Efeito)');
      embed.setColor('#d07fff');
      return embed;
    });
    const embed = new MessageEmbed({
      title: `${this.name} `,
      description: this.description,
      fields: [
        {
          name: 'Proficiência Máxima',
          inline: true,
          value: portugueseProficiency[this.proficiencyLimit],
        },
        {
          name: 'Categorias',
          inline: true,
          value: this.categories?.join(', ') || 'Sem Categorias',
        },
        {
          name: 'Dificuldade',
          inline: true,
          value: portugueseDifficulty[this.difficulty],
        },
      ],
    });

    return [embed, ...effects];
  }
}
