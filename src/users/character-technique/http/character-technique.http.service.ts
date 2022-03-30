import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterHttpService } from '~/users/character/http/character.http.service';
import { NestedInCharacterService } from '~/users/character/nested-in-character.interface';
import { Before, BaseCrudContext } from '~/utils/crud';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { CharacterTechnique } from '../entities/character-technique.entity';

@Injectable()
export class CharacterTechniqueHttpService
  extends HttpCrudService<CharacterTechnique>
  implements NestedInCharacterService<CharacterTechnique>
{
  constructor(
    @InjectRepository(CharacterTechnique)
    private readonly repo: Repository<CharacterTechnique>,
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
