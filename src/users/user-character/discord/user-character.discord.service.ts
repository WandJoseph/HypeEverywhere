import { Inject } from '@nestjs/common';
import { CharacterDiscordService } from '~/users/character-discord/character.discord.service';
import { Character } from '~/users/character/entities/character.entity';
import { UserDiscordService } from '~/users/user/discord/user.discord.service';
import { User } from '~/users/user/entities/user.entity';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';

export class UserCharacterDiscordService {
  constructor(
    @Inject(UserDiscordService)
    private readonly userService: UserDiscordService,
    @Inject(CharacterDiscordService)
    private readonly characterService: CharacterDiscordService,
  ) {}

  async findAll({ author }: DiscordCrudContext) {
    let mainCharacter: Character;
    const user = await this.userService.findOneOrFail({
      id: author.id,
    });
    const charactersResult = await this.characterService.findAll({
      options: { where: { ownerId: user.id } },
    });
    if (user.mainCharacterId) {
      mainCharacter = await this.characterService.findOne({
        id: user.mainCharacterId,
      });
      if (!mainCharacter) {
        await this.userService.update({
          id: user.id,
          dto: {
            mainCharacterId: null,
          },
        });
      }
    }

    return { charactersResult, mainCharacter };
  }
}
