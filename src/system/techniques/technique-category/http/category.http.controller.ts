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
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryHttpService } from './category.http.service';

@Controller('category')
@ApiTags('Categories')
export class CategoryHttpController {
  constructor(private readonly service: CategoryHttpService) {}
  @CreateRoute({
    type: Category,
  })
  async create(@Body() dto: CreateCategoryDto) {
    const ctx: BaseCrudContext = {
      dto,
    };
    return await this.service.create(ctx);
  }

  @UpdateRoute({
    type: Category,
  })
  update(@Param() params: FindOneParams, @Body() dto: UpdateCategoryDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }

  @DeleteRoute({
    type: Category,
  })
  delete(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Category,
  })
  findOne(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Category,
  })
  findAll(@Query() query: FindAllQuery) {
    const ctx: BaseCrudContext = {
      query,
    };
    return this.service.findAll(ctx);
  }
}
