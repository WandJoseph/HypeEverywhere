import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { toUniqueString } from '~/utils';
import { Before, BaseCrudContext } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { Technique } from '../entities/technique.entity';
@Injectable()
export class TechniqueHttpService extends CrudHttpService<Technique> {
  constructor(
    @InjectRepository(Technique)
    private readonly repo: Repository<Technique>,
  ) {
    super(repo);
  }
  @Before('create')
  @Before('update')
  async setUniqueName(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { name } = dto as Technique;
    if (name) {
      ctx.dto.uniqueName = toUniqueString(name);
    }
  }

  @Before('update')
  @Before('create')
  async shouldNotExistUniqueNameTechnique(ctx: BaseCrudContext) {
    const { uniqueName } = ctx.dto;
    const id = ctx?.id || 0;
    ctx.id = { where: { uniqueName, id: Not(id) } };
    await this.findOneAndFail(ctx);
    ctx.id = id;
    return ctx;
  }
}
