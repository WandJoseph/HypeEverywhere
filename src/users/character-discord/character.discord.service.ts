import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeHttpService } from '~/system/attributes/attribute/http/attribute.http.service';
import { CharacterAttributeService } from '~/users/character-attribute/character-attribute.service';
import { CharacterAttribute } from '~/users/character-attribute/entities/character-attribute.entity';
import { Character } from '~/users/character/entities/character.entity';
import { After, BaseCrudContext } from '~/utils/crud';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { AppEventEmitter, Event } from '~/utils/events';

@Injectable()
export class CharacterDiscordService extends DiscordCrudService<Character> {
  constructor(
    @InjectRepository(Character)
    private readonly repo: Repository<Character>,
    private readonly characterAttributeService: CharacterAttributeService,
    private readonly attributeService: AttributeHttpService,
    @Inject(EventEmitter2)
    private readonly eventEmitter: AppEventEmitter,
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

  @After('create')
  async emitEvent(ctx: BaseCrudContext) {
    this.eventEmitter.emit(Event.CHARACTER_CREATED, {
      character: ctx.entity,
    });
  }
}
