import { ApiProperty } from '@nestjs/swagger';
import { MessageEmbed } from 'discord.js';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attribute } from '~/system/attributes/attribute/entities/attribute.entity';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { CharacterTechnique } from '~/users/character-technique/entities/character-technique.entity';

export enum Element {
  Fire = 'fire',
  Water = 'water',
  Earth = 'earth',
  Air = 'air',
  Lightning = 'lightning',
}

@Entity()
export class Character {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '479115840529367050' })
  ownerId: string;

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

  attributes: CharacterAttribute[];
  techniques: CharacterTechnique[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  toDiscordEmbeds(): MessageEmbed[] {
    const embed = new MessageEmbed({
      title: this.name || 'Não Cadastrado',
      description: `${this.quote ? `${this.quote}' ~ *${this.name}*` : ''}
     ${this.nationality ? `Nacionalidade: ${this.nationality}` : ''}
     ${this.element ? `Elemento: ${this.element}` : ''}`,
    });
    this.personality && embed.addField('Personalidade', this.personality);
    if (this.attributes) {
      const attributes = this.attributes
        .map((attribute) => `${attribute.name}: \t ${attribute.value}`)
        .join('\n');
      embed.addField('Atributos', attributes);
    }
    return [embed];
  }
}
