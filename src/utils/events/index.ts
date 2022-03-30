import { EventEmitter2 } from '@nestjs/event-emitter';
import { TextChannel, User } from 'discord.js';
import { Character } from '~/users/character/entities/character.entity';

export enum Event {
  WAND_DICE_ROLLED = 'wand-dice:rolled',
}

export interface Payload {
  [Event.WAND_DICE_ROLLED]: {
    args: string[];
    channel: TextChannel;
    author: User;
    character?: Character;
  };
}

export interface AppEventEmitter extends EventEmitter2 {
  emit<E extends Event>(event: E, payload: Payload[E]): boolean;
}
