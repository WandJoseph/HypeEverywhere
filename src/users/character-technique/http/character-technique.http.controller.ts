import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  NestedInCharacterFindOneParams,
  NestedInCharacterParams,
} from '~/users/character/dto/nested-in-character.params';
import {
  CreateRoute,
  BaseCrudContext,
  UpdateRoute,
  DeleteRoute,
  FindOneRoute,
  FindAllRoute,
  FindAllQuery,
} from '~/utils/crud';
import { CreateCharacterTechniqueDto } from '../dto/create-character-technique.dto';
import { UpdateCharacterTechniqueDto } from '../dto/update-character.technique.dto';
import { CharacterTechnique } from '../entities/character-technique.entity';
import { CharacterTechniqueHttpService } from './character-technique.http.service';

@Controller('character/:characterId/technique')
@ApiTags('Character Techniques')
export class CharacterTechniqueHttpController {
  constructor(private readonly service: CharacterTechniqueHttpService) {}
  @CreateRoute({
    type: CharacterTechnique,
  })
  async create(
    @Param() params: NestedInCharacterParams,
    @Body() dto: CreateCharacterTechniqueDto,
  ) {
    const ctx: BaseCrudContext = {
      dto,
      params,
    };
    return await this.service.create(ctx);
  }

  @UpdateRoute({
    type: CharacterTechnique,
  })
  update(
    @Param() params: NestedInCharacterFindOneParams,
    @Body() dto: UpdateCharacterTechniqueDto,
  ) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: CharacterTechnique,
  })
  delete(@Param() params: NestedInCharacterFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: CharacterTechnique,
  })
  findOne(@Param() params: NestedInCharacterFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: CharacterTechnique,
  })
  findAll(
    @Param() params: NestedInCharacterParams,
    @Query() query: FindAllQuery,
  ) {
    const ctx: BaseCrudContext = {
      query,
      params,
      options: {
        where: {
          characterId: params.characterId,
        },
      },
    };
    return this.service.findAll(ctx);
  }
}
