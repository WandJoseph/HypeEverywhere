import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { Args, Author, Channel, Command, DiscordController } from '~/discord';
import { toShortName, toUniqueString } from '~/utils';
import { BaseCrudContext } from '~/utils/crud';
import { BarDiscordService } from './bar.discord.service';
@DiscordController({
  collection: 'bar',
})
@Controller()
export class BarDiscordController {
  constructor(private readonly service: BarDiscordService) {}

  @Command({
    name: '',
    description: 'Mostrar descrição de uma barra',
    aliases: ['mostrar', 'show', 'find'],
  })
  async findOne(
    @Channel() channel: TextChannel,
    @Args() args: string[],
    @Author() author: User,
  ) {
    const shortName = toShortName(args[0]);
    const uniqueName = toUniqueString(args[0]);

    const msg = await channel.send(`Buscando a barra '${args[0]}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ shortName }, { uniqueName }],
      },
    };
    const bar = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar a barra '${args[0]}'`,
    );
    const embeds = bar.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [embeds],
    });
  }
}
