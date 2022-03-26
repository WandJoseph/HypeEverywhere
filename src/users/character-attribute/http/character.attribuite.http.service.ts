import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterHttpService } from '~/users/character/http/character.http.service';
import { NestedInCharacterService } from '~/users/character/nested-in-character.interface';
import { Before, BaseCrudContext } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { CharacterAttribute } from '../entities/character-attribute.entity';

@Injectable()
export class CharacterAttributeHttpService
  extends CrudHttpService<CharacterAttribute>
  implements NestedInCharacterService<CharacterAttribute>
{
  constructor(
    @InjectRepository(CharacterAttribute)
    private readonly repo: Repository<CharacterAttribute>,
    private readonly characterHttpService: CharacterHttpService,
  ) {
    super(repo);
  }
  @Before('all')
  async shouldExistCharacter(ctx: BaseCrudContext) {
    const { characterId } = ctx.params;
    await this.characterHttpService.findOneOrFail({
      id: characterId,
    });
  }

  @Before('create')
  @Before('update')
  async setCharacterId(ctx: BaseCrudContext) {
    const characterId = ctx?.params?.characterId;
    ctx.dto.characterId = characterId;
  }
}
