import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Proficiency } from '~/system/techniques/technique/utils/technique.utils';

@Entity()
export class CharacterTechnique {
  @PrimaryColumn()
  characterId: number;

  @PrimaryColumn()
  techniqueId: number;

  @Column({ default: Proficiency.IMPROVISATION })
  proficiency: Proficiency;
}
