import { Controller } from '@nestjs/common';
import { MessageActionRow, MessageButton, TextChannel, User } from 'discord.js';
import { DiscordController, Command, Args, Author, Channel } from '~/discord';
import { BaseCrudContext } from '~/utils/crud';
import { CharacterDiscordService } from './character.discord.service';

@DiscordController({
  collection: 'pj',
})
@Controller()
export class CharacterDiscordController {
  constructor(private readonly service: CharacterDiscordService) {}

  @Command({
    name: 'show',
    description: 'Mostrar descrição de um personagem',
    aliases: ['mostrar', 'find'],
  })
  async findOne(
    @Channel() channel: TextChannel,
    @Args() args: string[],
    @Author() author: User,
  ) {
    const id = args.join(' ');

    const msg = await channel.send(`Buscando o personagem '${id}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ id }],
      },
    };
    const character = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar o personagem '${id}'`,
    );
    await this.service.getAttributes(character);
    const embeds = character.toDiscordEmbeds();
    await msg.edit({
      content: `${author}`,
      embeds: [...embeds],
    });
  }
}
