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
    const roll = this.service.roll({
      author,
      message: msg,
      args,
      channel,
    });
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
  async wandRoll(
    @Author() author: User,
    @Channel() channel: TextChannel,
    @Args() args: string[],
  ) {
    const message = await channel.send('Rolling a dice...');
    await this.service.wandRoll({ author, message, args, channel });
  }
}
