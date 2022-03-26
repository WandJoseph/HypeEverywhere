import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAttributeDto } from '~/system/attributes/attribute/dto/create-attribute.dto';
import { UpdateAttributeDto } from '~/system/attributes/attribute/dto/update-attribute.dto';
import { Attribute } from '~/system/attributes/attribute/entities/attribute.entity';
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
import { CreateCharacterAttributeDto } from '../dto/create-character-attribute.dto';
import { UpdateCharacterAttributeDto } from '../dto/update-character-attribute.dto';
import { CharacterAttribute } from '../entities/character-attribute.entity';
import { CharacterAttributeHttpService } from './character.attribuite.http.service';

@Controller('character/:characterId/attribute')
@ApiTags('Character Attributes')
export class CharacterAttributeHttpController {
  constructor(private readonly service: CharacterAttributeHttpService) {}
  // @CreateRoute({
  //   type: CharacterAttribute,
  // })
  // async create(
  //   @Param() params: NestedInCharacterParams,
  //   @Body() dto: CreateCharacterAttributeDto,
  // ) {
  //   const ctx: BaseCrudContext = {
  //     dto,
  //     params,
  //   };
  //   return await this.service.create(ctx);
  // }

  @UpdateRoute({
    type: CharacterAttribute,
  })
  update(
    @Param() params: NestedInCharacterFindOneParams,
    @Body() dto: UpdateCharacterAttributeDto,
  ) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: CharacterAttribute,
  })
  delete(@Param() params: NestedInCharacterFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: CharacterAttribute,
  })
  findOne(@Param() params: NestedInCharacterFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: CharacterAttribute,
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
