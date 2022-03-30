import { Message } from 'discord.js';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { Character } from '~/users/character/entities/character.entity';
import { CharacterDiscordService } from '~/users/character-discord/character.discord.service';
import { toUniqueString } from '~/utils';
import { Roll } from '../entities/roll.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { onMessageErrorHandler } from '~/discord/discord.utils';
import { Event, Payload } from '~/utils/events';
import { WandRoll } from '../entities/wand-roll.entity';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { Technique } from '~/system/techniques/technique/entities/technique.entity';
import { DifficultyModifier } from '~/system/techniques/technique/utils/technique.utils';

interface ExpressionHandlerOptions {
  characterAttributes?: CharacterAttribute[];
  technique?: Technique;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RollOptions extends ExpressionHandlerOptions {}

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
  handleExpressionTechnique(technique: Technique, expression: string): string {
    let expr = expression;
    const option = 'technique:difficulty';
    const difficulty = DifficultyModifier[technique.difficulty];
    const re = new RegExp('\\b' + option + '\\b', 'g');
    expr = expr.replace(re, `${difficulty}`);
    return expr;
  }
  getExpressions(args: string[], options: ExpressionHandlerOptions = {}) {
    const { characterAttributes, technique } = options;
    const originalExpression = args.join(' ');
    let treatedExpression = this.handleExpressionSymbols(originalExpression);
    if (characterAttributes) {
      treatedExpression = this.handleExpressionAttributes(
        characterAttributes,
        treatedExpression,
      );
    }
    if (technique) {
      treatedExpression = this.handleExpressionTechnique(
        technique,
        treatedExpression,
      );
    }
    return { treatedExpression, originalExpression };
  }

  async roll(args: string[], options: RollOptions = {}) {
    const { characterAttributes } = options;
    const { treatedExpression, originalExpression } = this.getExpressions(
      args,
      {
        characterAttributes,
      },
    );
    const roll = new Roll(treatedExpression, originalExpression);
    return roll;
  }

  async wandRoll(args: string[], options: RollOptions = {}) {
    const { treatedExpression, originalExpression } = this.getExpressions(
      args,
      {
        ...options,
      },
    );
    const roll = new WandRoll(treatedExpression, originalExpression);
    return roll;
  }
  @OnEvent(Event.WAND_DICE_ROLLED)
  async onWandRoll({
    args,
    characterAttributes,
    technique,
    channel,
    author,
  }: Payload[Event.WAND_DICE_ROLLED]) {
    let message: Message;
    try {
      const roll = await this.wandRoll(args, {
        characterAttributes,
        technique,
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
