import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BaseCrudContext,
  DeleteRoute,
  FindAllRoute,
  FindOneParams,
  FindOneRoute,
  UpdateRoute,
} from '~/utils/crud';
import { CreateRoute } from '~/utils/crud/decorators/create-route.decorator';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { Character } from '../entities/character.entity';
import { CharacterHttpService } from './character.http.service';

@ApiTags('Character')
@Controller({
  version: '1',
  path: 'character',
})
export class CharacterHttpController {
  constructor(private readonly service: CharacterHttpService) {}

  @CreateRoute({
    type: Character,
  })
  async create(@Body() dto: CreateCharacterDto) {
    const ctx: BaseCrudContext = {
      dto,
    };
    return await this.service.create(ctx);
  }
  @UpdateRoute({
    type: Character,
  })
  update(@Param() params: FindOneParams, @Body() dto: UpdateCharacterDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }
  @DeleteRoute({
    type: Character,
  })
  delete(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }
  @FindOneRoute({
    type: Character,
  })
  findOne(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }
  @FindAllRoute({
    type: Character,
  })
  findAll() {
    const ctx: BaseCrudContext = {};
    return this.service.findAll(ctx);
  }
}
