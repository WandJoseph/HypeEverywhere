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
import { BarHttpService } from './bar.http.service';
import { CreateBarDto } from '../dto/create-bar.dto';
import { UpdateBarDto } from '../dto/update-bar.dto';
import { Bar } from '../entities/bar.entity';

@Controller('bar')
@ApiTags('Bar')
export class BarHttpController {
  constructor(private readonly service: BarHttpService) {}
  @CreateRoute({
    type: Bar,
  })
  async create(@Body() dto: CreateBarDto) {
    const ctx: BaseCrudContext = {
      dto,
    };
    return await this.service.create(ctx);
  }

  @UpdateRoute({
    type: Bar,
  })
  update(@Param() params: FindOneParams, @Body() dto: UpdateBarDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: Bar,
  })
  delete(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Bar,
  })
  findOne(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Bar,
  })
  findAll(@Query() query: FindAllQuery) {
    const ctx: BaseCrudContext = {
      query,
    };
    return this.service.findAll(ctx);
  }
}
