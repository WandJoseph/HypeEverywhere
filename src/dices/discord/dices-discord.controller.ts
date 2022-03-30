import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
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
    const roll = await this.service.roll(args);
    const embeds = roll.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds,
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
    const msg = await channel.send('Rolling a dice...');
    const roll = await this.service.wandRoll(args);
    const embeds = roll.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds,
    });
  }
}
