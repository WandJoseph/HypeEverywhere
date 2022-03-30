import { Controller } from '@nestjs/common';
import { MessageEmbed, TextChannel, User } from 'discord.js';
import { Args, Author, Channel, Command, DiscordController } from '~/discord';
import { CharacterDiscordService } from '~/users/character-discord/character.discord.service';
import { Character } from '~/users/character/entities/character.entity';
import { UserDiscordService } from '~/users/user/discord/user.discord.service';
import { UserCharacterDiscordService } from './user-character.discord.service';

@Controller()
@DiscordController({
  collection: 'pj',
})
export class UserCharacterDiscordController {
  constructor(
    private readonly userService: UserDiscordService,
    private readonly service: UserCharacterDiscordService,
  ) {}

  @Command({
    name: 'list',
    description: 'Listar personagens',
  })
  async findAll(
    @Channel() channel: TextChannel,
    @Author() author: User,
    @Args() args: string[],
  ) {
    const msg = await channel.send(`Buscando seus Personagens`);
    const { charactersResult, mainCharacter } = await this.service.findAll({
      author,
    });
    const page = args[0] || 1;
    const embeds = charactersResult.data.map(
      (char: Character, index: number) => {
        const embed = char.toDiscordEmbeds()[0];
        embed.setTitle(`${index + 1} - ` + embed.title);
        return embed;
      },
    );
    const mainCharacterEmbed = mainCharacter.toDiscordEmbeds()[0];
    mainCharacterEmbed.setTitle(
      `${mainCharacterEmbed.title} (Personagem Principal)`,
    );
    await msg.edit({
      embeds: [
        new MessageEmbed({
          author: {
            name: author.username,
            icon_url: author.avatarURL(),
          },
          description: `Personagens, Página ${page}
        Para ver mais personagens, use o comando \`!pj list <página>\``,
        }),
        mainCharacterEmbed,
        ...embeds,
      ],
    });
  }
}
