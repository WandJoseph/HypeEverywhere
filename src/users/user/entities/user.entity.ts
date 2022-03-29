import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';
import { Character } from '~/users/character/entities/character.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  characters: Character[];

  main: Character;
}
