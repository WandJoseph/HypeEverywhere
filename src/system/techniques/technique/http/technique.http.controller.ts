import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRoute,
  BaseCrudContext,
  UpdateRoute,
  FindOneParams,
  DeleteRoute,
  FindOneRoute,
  FindAllRoute,
  FindAllQuery,
} from '~/utils/crud';
import { CreateTechniqueDto } from '../dto/create-technique.dto';
import { UpdateTechniqueDto } from '../dto/update-technique.dto';
import { Technique } from '../entities/technique.entity';
import { TechniqueHttpService } from './technique.http.service';

@Controller('technique')
@ApiTags('Techniques')
export class TechniqueHttpController {
  constructor(private readonly service: TechniqueHttpService) {}
  @CreateRoute({
    type: Technique,
  })
  async create(@Body() dto: CreateTechniqueDto) {
    const ctx: BaseCrudContext = {
      dto,
    };
    return await this.service.create(ctx);
  }

  @UpdateRoute({
    type: Technique,
  })
  update(@Param() params: FindOneParams, @Body() dto: UpdateTechniqueDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: Technique,
  })
  delete(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Technique,
  })
  findOne(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Technique,
  })
  findAll(@Query() query: FindAllQuery) {
    const ctx: BaseCrudContext = {
      query,
    };
    return this.service.findAll(ctx);
  }
}
