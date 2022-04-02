import { ApiProperty } from '@nestjs/swagger';
import { EmbedField, MessageEmbed } from 'discord.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Effect } from '../../technique-effect/entities/effect.entity';
import { TechniquePortuguese } from '../utils/languages/technique.portuguese';
import { Difficulty, Proficiency } from '../utils/technique.utils';

// Improvisation / Beginner / Skillful / Graduate / Master

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
    default: Proficiency.MASTER,
  })
  @ApiProperty()
  proficiencyLimit: Proficiency;

  @Column({
    default: Difficulty.MEDIUM,
  })
  @ApiProperty()
  difficulty: Difficulty;

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
    const effects: MessageEmbed[] = this.effects
      ? this.effects.map((effect) => {
          const embed = effect.toDiscordEmbeds()[0];
          embed.setTitle(embed.title + ' (Efeito)');
          embed.setColor('#d07fff');
          return embed;
        })
      : [];
    const embed = new MessageEmbed({
      title: `${this.name}`,
      description: this.description,
    });
    this.proficiencyLimit &&
      embed.addField(
        'Nível de Proficiência Máximo',
        this.proficiencyLimit,
        true,
      );
    this.difficulty && embed.addField('Dificuldade', this.difficulty, true);
    this.categories &&
      embed.setFooter({
        text: `Categorias: ${this.categories.join(', ')}`,
      });

    return [embed];
  }
}
