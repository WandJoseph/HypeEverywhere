import { Controller } from '@nestjs/common';
import {
  ColorResolvable,
  EmbedField,
  MessageEmbed,
  TextChannel,
  User,
} from 'discord.js';
import { DiscordController } from '~/discord';
import {
  Args,
  Author,
  Channel,
  Command,
} from '~/discord/decorator/commands.decorator';
import { DicesDiscordService } from './dices-discord.service';

@DiscordController()
@Controller()
export class DicesDiscordController {
  constructor(private readonly service: DicesDiscordService) {}

  @Command({
    name: 'roll',
    description: 'Faz uma rolagem com dados',
    aliases: ['r'],
  })
  async roll(
    @Author() author: User,
    @Channel() channel: TextChannel,
    @Args() args: string[],
  ) {
    const msg = await channel.send('Rolling a dice...');
    const roll = this.service.roll(...args);
    const color: ColorResolvable = '#ffffff';

    const embed = new MessageEmbed({
      color,
      title: `${roll.originalExpr} = ${
        roll.total || roll.total === 0
          ? roll.total
          : roll.result
          ? 'Sucesso'
          : 'Falha'
      }`,
      description: `${roll.leftDiceExpr} ${
        roll.operator ? roll.operator + ' ' : ''
      }${roll.rightDiceExpr || ''}`,
    });
    await msg.edit({
      content: `${author}`,
      embeds: [embed],
    });
  }
  @Command({
    name: 'wroll',
    description: 'Automatic insert default dice for Wand Roll',
    aliases: ['w'],
  })
  async WandRoll(
    @Author() author: User,
    @Channel() channel: TextChannel,
    @Args() args: string[],
  ) {
    const msg = await channel.send('Rolling a dice...');
    args = ['3d10', '<', ...args];
    const roll = this.service.roll(...args);
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

    await msg.edit({
      content: `${author}`,
      embeds: [embed],
    });
  }
}
