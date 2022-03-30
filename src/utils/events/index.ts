import { EventEmitter2 } from '@nestjs/event-emitter';
import { TextChannel, User } from 'discord.js';
import { Technique } from '~/system/techniques/technique/entities/technique.entity';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { Character } from '~/users/character/entities/character.entity';

export enum Event {
  WAND_DICE_ROLLED = 'wand-dice:rolled',
}

export interface Payload {
  [Event.WAND_DICE_ROLLED]: {
    args: string[];
    channel: TextChannel;
    author: User;
    characterAttributes?: CharacterAttribute[];
    technique: Technique;
  };
}

export interface AppEventEmitter extends EventEmitter2 {
  emit<E extends Event>(event: E, payload: Payload[E]): boolean;
}
