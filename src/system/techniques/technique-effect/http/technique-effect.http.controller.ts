import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRoute,
  BaseCrudContext,
  UpdateRoute,
  DeleteRoute,
  FindOneRoute,
  FindAllRoute,
  FindAllQuery,
} from '~/utils/crud';
import { NestedInTechniqueFindOneParams } from '../../technique/dto/nested-in-technique-find-one.params';
import { NestedInTechniqueParams } from '../../technique/dto/nested-in-technique.params';
import { CreateEffectDto } from '../dto/create-effect.dto';
import { UpdateEffectDto } from '../dto/update-effect.dto';
import { Effect } from '../entities/effect.entity';
import { TechniqueEffectHttpService } from './technique-effect.http.service';

@Controller('technique/:techniqueId/effect')
@ApiTags('Technique Effects')
export class TechniqueEffectHttpController {
  constructor(private readonly service: TechniqueEffectHttpService) {}
  @CreateRoute({
    type: Effect,
  })
  async create(
    @Param() params: NestedInTechniqueParams,
    @Body() dto: CreateEffectDto,
  ) {
    const ctx: BaseCrudContext = {
      dto,
      params,
    };
    return await this.service.create(ctx);
  }

  @UpdateRoute({
    type: Effect,
  })
  update(
    @Param() params: NestedInTechniqueFindOneParams,
    @Body() dto: UpdateEffectDto,
  ) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: Effect,
  })
  delete(@Param() params: NestedInTechniqueFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Effect,
  })
  findOne(@Param() params: NestedInTechniqueFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Effect,
  })
  findAll(
    @Param() params: NestedInTechniqueParams,
    @Query() query: FindAllQuery,
  ) {
    const ctx: BaseCrudContext = {
      query,
      params,
      options: {
        where: {
          techniqueId: params.techniqueId,
        },
      },
    };
    return this.service.findAll(ctx);
  }
}
