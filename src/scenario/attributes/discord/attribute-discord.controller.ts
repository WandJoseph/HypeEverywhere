import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { Args, Author, Channel, Command, DiscordController } from '~/discord';
import { BaseCrudContext } from '~/utils/crud';
import { AttributeDiscordService } from './attribute-discord.service';

@DiscordController({
  collection: 'atb',
})
@Controller()
export class AttributeDiscordController {
  constructor(private readonly service: AttributeDiscordService) {}

  @Command({
    name: '',
    description: 'Mostrar descrição de um atributo',
    aliases: ['mostrar', 'show', 'find'],
  })
  async findOne(
    @Channel() channel: TextChannel,
    @Args() args: string[],
    @Author() author: User,
  ) {
    const name = args[0];
    const msg = await channel.send(`Buscando o Atributo '${name}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [
          { shortName: name.toUpperCase() },
          { uniqueName: name.toLocaleLowerCase() },
        ],
      },
    };
    const atb = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar o Atributo ${name}`,
    );
    const embeds = atb.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [embeds],
    });
  }
}
