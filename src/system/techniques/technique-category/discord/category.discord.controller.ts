import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { DiscordController, Command, Args, Author, Channel } from '~/discord';
import { toShortName, toUniqueString } from '~/utils';
import { BaseCrudContext } from '~/utils/crud';
import { CategoryDiscordService } from './category.discord.service';

@DiscordController({
  collection: 't category',
})
@Controller()
export class CategoryDiscordController {
  constructor(private readonly service: CategoryDiscordService) {}

  @Command({
    name: '',
    description: 'Mostrar descrição de uma técnica',
    aliases: ['mostrar', 'show', 'find'],
  })
  async findOne(
    @Channel() channel: TextChannel,
    @Args() args: string[],
    @Author() author: User,
  ) {
    const name = args.join(' ');
    const uniqueName = toUniqueString(name);

    const msg = await channel.send(`Buscando a category '${name}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ uniqueName }],
      },
    };
    const category = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar a category '${name}'`,
    );
    const embeds = category.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [embeds],
    });
  }
}
