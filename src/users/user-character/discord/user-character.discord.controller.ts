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
    private readonly characterService: CharacterDiscordService,
    private readonly service: UserCharacterDiscordService,
  ) {}
  @Command({
    name: 'create',
    description: 'Listar personagens',
    aliases: ['new', 'novo', 'criar', 'criar-personagem'],
  })
  async create(
    @Channel() channel: TextChannel,
    @Author() author: User,
    @Args() args: string[],
  ) {
    const msg = await channel.send(`Criando um novo personagem`);
    const user = await this.userService.findOneOrFail({ id: author.id });
    const name = args.join(' ');
    const character = await this.characterService.create({
      dto: {
        ownerId: user.id,
        name,
      },
    });
    if (!user.mainCharacterId) {
      user.mainCharacterId = character.id;
      await this.userService.update({
        id: user.id,
        dto: {
          mainCharacterId: user.mainCharacterId,
        },
      });
    }
    await msg.edit({
      content: `${author}`,
      embeds: [
        new MessageEmbed({
          title: `Personagem '${name}' criado com sucesso!`,
          description: `Utilize \`!pj edit ${character.id}\` para editar o personagem`,
        }),
      ],
    });
  }
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
        embed.setFooter({
          text: `${index + 1}, Página ${page}`,
        });
        return embed;
      },
    );
    if (mainCharacter) {
      const mainCharacterEmbed = mainCharacter.toDiscordEmbeds()[0];
      mainCharacterEmbed.setTitle(
        `${mainCharacterEmbed.title} (Personagem Principal)`,
      );
      embeds.unshift(mainCharacterEmbed);
    }
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
        ...embeds,
      ],
    });
  }
}
