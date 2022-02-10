import { Controller } from '@nestjs/common';
import {
  ColorResolvable,
  EmbedField,
  MessageEmbed,
  TextChannel,
  User,
} from 'discord.js';
import {
  Args,
  Author,
  Channel,
  Command,
  DiscordController,
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
    const totalField: EmbedField =
      typeof roll.total == 'number'
        ? { name: `Total: ${roll.total}`, value: '', inline: false }
        : {
            name: roll.total ? 'Sucesso!' : 'Falha!',
            value: '',
            inline: false,
          };
    totalField.value = roll.mathExpression;
    // const toto
    const color: ColorResolvable = roll.total ? '#00ff00' : '#ff0000';
    const embed = new MessageEmbed({
      color,
      author: {
        name: author.username,
        icon_url: author.avatarURL(),
      },
      title: `Rolou ${roll.expression}`,
      fields: [totalField],
    });
    await msg.edit({
      content: `${author} `,
      embeds: [embed],
    });
  }
  @Command({
    name: 'sroll',
    description: 'Roll a Storyteller style dice',
    aliases: ['s'],
  })
  async storytellerRoll(
    @Author() author: User,
    @Channel() channel: TextChannel,
    @Args() args: string[],
  ) {
    const msg = await channel.send('Rolling a dice...');
    const roll = this.service.storytellerRoll(...args);

    const totalField: EmbedField =
      typeof roll.total == 'number'
        ? { name: `Total: ${roll.total}`, value: '', inline: false }
        : {
            name: roll.total ? 'Sucesso!' : 'Falha!',
            value: '',
            inline: false,
          };
    totalField.value = roll.mathExpression;
    // const toto
    const color: ColorResolvable = roll.total ? '#00ff00' : '#ff0000';
    const title =
      roll.expression.length > 255
        ? `Total: ${roll.total}`
        : `Rolou:\n${roll.expression}`;
    const description =
      roll.expression.length > 255 ? roll.expression : undefined;
    const embed = new MessageEmbed({
      color,
      description,
      author: {
        name: author.username,
        icon_url: author.avatarURL(),
      },
      title,
      fields: [totalField],
    });
    await msg.edit({
      content: `${author} `,
      embeds: [embed],
    });
  }
}
