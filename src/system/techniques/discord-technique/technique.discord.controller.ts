import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { DiscordController, Command, Args, Author, Channel } from '~/discord';
import { toShortName, toUniqueString } from '~/utils';
import { BaseCrudContext } from '~/utils/crud';
import { TechniqueDiscordService } from './technique.discord.service';

@DiscordController({
  collection: 't',
})
@Controller()
export class TechniqueDiscordController {
  constructor(private readonly service: TechniqueDiscordService) {}

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

    const msg = await channel.send(`Buscando a Técnica '${name}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ uniqueName }],
      },
    };
    const technique = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar a técnica '${name}'`,
    );
    await this.service.getCategories(technique);
    const embeds = technique.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [embeds],
    });
  }
}
