import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeHttpService } from '~/system/attributes/attribute/http/attribute.http.service';
import { CharacterAttributeService } from '~/users/character-attribute/character-attribute.service';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { Character } from '~/users/character/entities/character.entity';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';

@Injectable()
export class CharacterDiscordService extends DiscordCrudService<Character> {
  constructor(
    @InjectRepository(Character)
    private readonly repo: Repository<Character>,
    private readonly characterAttributeService: CharacterAttributeService,
    private readonly attributeService: AttributeHttpService,
  ) {
    super(repo);
  }

  async getAttributes(character: Character) {
    const { data: characterAttributes } =
      await this.characterAttributeService.findAll({
        params: { characterId: character.id },
        options: { where: { characterId: character.id } },
        query: {
          take: 50,
        },
      });

    const cas: CharacterAttribute[] = [];
    for (const characterAttribute of characterAttributes) {
      const attribute = await this.attributeService.findOne({
        id: characterAttribute.attributeId,
      });
      characterAttribute.name = attribute.name;
      characterAttribute.shortName = attribute.shortName;
      cas.push(characterAttribute);
    }
    character.attributes = cas;
  }
}
