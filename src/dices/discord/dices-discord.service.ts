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

interface RollOptions {
  message?: Message<boolean>;
  channel: TextChannel;
  author: User;
  args: any[];
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

  isNumber(value: string) {
    return !isNaN(+value);
  }
  isDice(value: string) {
    const rolls: string[] = value.split('d');
    if (rolls.length !== 2) return false;
    if (!this.isNumber(rolls[0]) || !this.isNumber(rolls[1])) return false;
    return true;
  }
  isOperator(value: string) {
    return value === '+' || value === '-' || value === '*' || value === '/';
  }

  roll({ character, args }: RollOptions) {
    // RESOLVE ARGS
    const originalExpr = args.join(' ');
    let expression = this.handleExpressionSymbols(originalExpr);
    if (character) {
      expression = this.handleExpressionAttributes(
        character.attributes,
        expression,
      );
    }
    const roll = new Roll(expression, originalExpr);
    return roll;
  }
  dice(n: number, f: number): Dice {
    const dice = new Dice(n, f);
    return dice;
  }

  async wandRoll({ args, message, character, author, channel }: RollOptions) {
    args = ['3d10 <', ...args];
    const roll = this.roll({
      args,
      message,
      author,
      character,
      channel,
    });
    const margin = roll.rightTotal - roll.leftTotal;
    const criticSuccess = roll.leftTotal <= 5;
    const criticFail = roll.leftTotal >= 27;

    const color: ColorResolvable = criticSuccess
      ? '#ffbd33'
      : criticFail
      ? '#000000'
      : roll.result
      ? '#00ff00'
      : '#ff0000';
    const title = criticSuccess
      ? ' :star: SUCESSSO CRITICO!! :star:'
      : criticFail
      ? ' :skull_crossbones: FALHA CRITICA HAHA!! :skull_crossbones:'
      : roll.result
      ? 'Sucesso!'
      : 'Falha!';

    const rollField: EmbedField = {
      name: 'Rolagem',
      value: `${roll.leftTotal}`,
      inline: true,
    };

    const habilityField: EmbedField = {
      name: 'Nível de Habilidade',
      value: `${roll.rightTotal}`,
      inline: true,
    };
    const totalField: EmbedField = {
      name: `Margem: ${margin}`,
      value: `${roll.rightTotal}-${roll.leftTotal} = ${margin}`,
      inline: false,
    };

    const embed = new MessageEmbed({
      color,
      description: `${roll.leftDiceExpr} ${roll.operator} ${roll.rightDiceExpr}`,
      title,
      fields: [rollField, habilityField, totalField],
    });
    const messageContent = {
      content: `${author}`,
      embeds: [embed],
    };
    message
      ? await message.edit(messageContent)
      : await channel.send(messageContent);
  }
  @OnEvent('wand-dice:rolled')
  async onWandRoll(ctx: RollOptions) {
    try {
      await this.wandRoll(ctx);
    } catch (error) {
      await onMessageErrorHandler(ctx.message, error, ctx.channel);
    }
  }
}
