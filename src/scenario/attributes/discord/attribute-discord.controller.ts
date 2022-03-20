import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { Args, Author, Channel, Command, DiscordController } from '~/discord';
import { toShortName, toUniqueString } from '~/utils';
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
    const shortName = toShortName(args[0]);
    const uniqueName = toUniqueString(args[0]);

    const msg = await channel.send(`Buscando o Atributo '${args[0]}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ shortName }, { uniqueName }],
      },
    };
    const atb = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar o Atributo '${args[0]}'`,
    );
    const embeds = atb.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [embeds],
    });
  }
}
