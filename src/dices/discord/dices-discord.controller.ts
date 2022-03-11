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

  @Command({ name: 'roll', description: 'Roll a dice', aliases: ['r'] })
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
      author: {
        name: author.username,
        icon_url: author.avatarURL(),
      },
      title: `${roll.expression}`,
      description: `${roll.total}`,
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
    const color: ColorResolvable = roll.result ? '#00ff00' : '#ff0000';
    const margin = roll.rightTotal - roll.leftTotal;

    const leftField: EmbedField = {
      name: 'Rolagem',
      value: `${roll.leftTotal}`,
      inline: true,
    };

    const rightField: EmbedField = {
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
      author: {
        name: author.username,
        icon_url: author.avatarURL(),
      },
      description: `${roll.leftDiceExpr}: ${roll.leftTotal} ${roll.operator} ${roll.rightDiceExpr}`,
      title: roll.result ? 'Sucesso!' : 'Falha!',
      fields: [leftField, rightField, totalField],
    });
    await msg.edit({
      content: `${author}`,
      embeds: [embed],
    });
  }
}
