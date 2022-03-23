import { Body, Controller, Param, Query } from '@nestjs/common';
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
import { NestedInTechniqueDto } from '../../technique/dto/nested-in-technique.dto';
import { CreateTechniqueCategoryDto } from '../dto/create-technique-category.dto';
import { FindOneTechniqueCategoryParams } from '../dto/find-one-technique-category.params';
import { UpdateCategoryTechniqueDto } from '../dto/update-technique-category.dto';
import { Category } from '../entities/category.entity';
import { TechniqueCategoryHttpService } from './technique-category.http.service';

@Controller('technique/:techniqueId/category')
@ApiTags('Technique Categories')
export class TechniqueCategoryHttpController {
  constructor(private readonly service: TechniqueCategoryHttpService) {}
  @CreateRoute({
    type: Category,
  })
  async create(
    @Param() params: NestedInTechniqueDto,
    @Body() dto: CreateTechniqueCategoryDto,
  ) {
    const ctx: BaseCrudContext = {
      params,
      dto,
    };
    return await this.service.create(ctx);
  }
  // NO UPDATE METHOD, ONLY CREATE AND REMOVE
  // @UpdateRoute({
  //   type: Category,
  // })
  // update(
  //   @Param() params: FindOneTechniqueCategoryParams,
  //   @Body() dto: UpdateCategoryTechniqueDto,
  // ) {
  //   const ctx: BaseCrudContext = {
  //     id: {
  //       where: {
  //         techniqueId: params.techniqueId,
  //       },
  //     },
  //     params,
  //     dto,
  //   };
  //   return this.service.update(ctx);
  // }

  @DeleteRoute({
    type: Category,
  })
  delete(@Param() params: FindOneTechniqueCategoryParams) {
    const ctx: BaseCrudContext = {
      id: {
        techniqueId: params.techniqueId,
        categoryId: params.id,
      },
      params,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Category,
  })
  findOne(@Param() params: FindOneTechniqueCategoryParams) {
    const ctx: BaseCrudContext = {
      id: {
        where: {
          techniqueId: params.techniqueId,
          categoryId: params.id,
        },
      },
      params,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Category,
  })
  findAll(@Param() params: NestedInTechniqueDto, @Query() query: FindAllQuery) {
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
