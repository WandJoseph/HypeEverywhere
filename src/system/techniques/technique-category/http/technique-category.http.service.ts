import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudContext, Before } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { TechniqueHttpService } from '../../technique/http/technique.http.service';
import { TechniqueCategory } from '../entities/technique-category.entity';
import { CategoryHttpService } from './category.http.service';

@Injectable()
export class TechniqueCategoryHttpService extends CrudHttpService<TechniqueCategory> {
  constructor(
    @InjectRepository(TechniqueCategory)
    private readonly repo: Repository<TechniqueCategory>,
    private readonly techniqueService: TechniqueHttpService,
    private readonly categoryService: CategoryHttpService,
  ) {
    super(repo);
  }
  @Before('create')
  @Before('findAll')
  async shouldExistTechnique(ctx: BaseCrudContext) {
    const { params } = ctx;
    const findCtx: BaseCrudContext = {
      id: params.techniqueId,
    };
    await this.techniqueService.findOneOrFail(findCtx);
  }
  @Before('create')
  async shouldExistCategory(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const findCtx: BaseCrudContext = {
      id: dto.categoryId,
    };
    await this.categoryService.findOneOrFail(findCtx);
  }
  @Before('create')
  async shouldNotExistTechniqueCategory(ctx: BaseCrudContext) {
    const { dto, params } = ctx;
    const findCtx: BaseCrudContext = {
      id: {
        where: { categoryId: dto.categoryId, techniqueId: params.techniqueId },
      },
    };
    await this.findOneAndFail(findCtx);
  }
  @Before('delete')
  @Before('findOne')
  async shouldExistTechniqueCategory(ctx: BaseCrudContext) {
    const { dto, params } = ctx;
    const findCtx: BaseCrudContext = {
      id: {
        where: { categoryId: params.id, techniqueId: params.techniqueId },
      },
    };
    await this.findOneOrFail(findCtx);
  }
  @Before('create')
  async setTechniqueIdInDto(ctx: BaseCrudContext) {
    const { params } = ctx;
    if (params.techniqueId) {
      ctx.dto.techniqueId = params.techniqueId;
    }
  }
}
