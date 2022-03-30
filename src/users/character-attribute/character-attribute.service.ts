import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeHttpService } from '~/system/attributes/attribute/http/attribute.http.service';

import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { Event, Payload } from '~/utils/events';
import { Character } from '../character/entities/character.entity';
import { CreateCharacterAttributeDto } from './dto/create-character-attribute.dto';
import { CharacterAttribute } from './entities/character-attribute.entity';

export class CharacterAttributeService extends HttpCrudService<CharacterAttribute> {
  constructor(
    @InjectRepository(CharacterAttribute)
    private readonly repo: Repository<CharacterAttribute>,
    private readonly attributeService: AttributeHttpService,
  ) {
    super(repo);
  }

  @OnEvent(Event.CHARACTER_CREATED)
  async onCharacterCreated({ character }: Payload[Event.CHARACTER_CREATED]) {
    const { data: attributes } = await this.attributeService.findAll({
      query: { take: 50 },
    });
    for (const attribute of attributes) {
      const dto: CreateCharacterAttributeDto = {
        attributeId: attribute.id,
        characterId: character.id,
      };
      this.create({
        dto,
      });
    }
  }
}
