import {
  ColorResolvable,
  EmbedField,
  Message,
  MessageEmbed,
  TextChannel,
  User,
} from 'discord.js';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { Character } from '~/users/character/entities/character.entity';
import { CharacterDiscordService } from '~/users/character-discord/character.discord.service';
import { toUniqueString } from '~/utils';
import { Dice } from '../entities/dice.entitiy';
import { Roll } from '../entities/roll.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { onMessageErrorHandler } from '~/discord/discord.utils';
import { Event, Payload } from '~/utils/events';
import { WandRoll } from '../entities/wand-roll.entity';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';

interface ExpressionHandlerOptions {
  character?: Character;
}
interface RollOptions {
  character?: Character;
}
interface WandRollOptions {
  character?: Character;
}
export class DicesDiscordService {
  constructor(private readonly characterService: CharacterDiscordService) {}
  handleExpressionSymbols(expression: string) {
    const re = /([-!$%^&*()_+|~=`{}\[\]";'<>?,.\/])/g;
    const expr = expression.replace(re, ' $1 ');
    return expr;
  }
  handleExpressionAttributes(
    cAttribute: CharacterAttribute[],
    expression: string,
  ): string {
    // IF NOT INFORMED A ARRAY
    if (cAttribute.length === 0) return expression;
    let expr = expression;
    for (const attribute of cAttribute) {
      const name = toUniqueString(attribute.shortName);
      const replace = new RegExp(
        '\\b' + name + '|' + 'attribute:' + name + '\\b',
        'g',
      );
      expr = expr.replace(replace, `${attribute.value}`);
    }
    return expr;
  }

  getExpressions(args: string[], options: ExpressionHandlerOptions = {}) {
    const { character } = options;
    const originalExpression = args.join(' ');
    let treatedExpression = this.handleExpressionSymbols(originalExpression);
    if (character) {
      treatedExpression = this.handleExpressionAttributes(
        character?.attributes,
        originalExpression,
      );
    }
    return { treatedExpression, originalExpression };
  }

  async roll(args: string[], options: RollOptions = {}) {
    const { character } = options;
    const { treatedExpression, originalExpression } = this.getExpressions(
      args,
      {
        character,
      },
    );
    const roll = new Roll(treatedExpression, originalExpression);
    return roll;
  }

  async wandRoll(args: string[], options: WandRollOptions = {}) {
    const { character } = options;
    const { treatedExpression, originalExpression } = this.getExpressions(
      args,
      {
        character,
      },
    );
    const roll = new WandRoll(treatedExpression, originalExpression);
    return roll;
  }
  @OnEvent(Event.WAND_DICE_ROLLED)
  async onWandRoll({
    args,
    character,
    channel,
    author,
  }: Payload[Event.WAND_DICE_ROLLED]) {
    let message: Message;
    try {
      const roll = await this.wandRoll(args, {
        character,
      });
      const embeds = roll.toDiscordEmbeds();
      message = await channel.send({
        content: `${author}`,
        embeds,
      });
    } catch (error) {
      const ctx: DiscordCrudContext = {
        author,
        responseChannel: channel,
      };
      await onMessageErrorHandler(message, error, channel);
    }
  }
}
