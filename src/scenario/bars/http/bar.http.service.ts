import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { toShortName, toUniqueString } from '~/utils';
import { Before, BaseCrudContext } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { Bar } from '../entities/bar.entity';

@Injectable()
export class BarHttpService extends CrudHttpService<Bar> {
  constructor(
    @InjectRepository(Bar)
    private readonly repo: Repository<Bar>,
  ) {
    super(repo);
  }
  @Before('create')
  @Before('update')
  async setUniqueName(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { name } = dto as Bar;
    const uniqueName = toUniqueString(name);
    ctx.dto.uniqueName = uniqueName;
  }

  @Before('update')
  @Before('create')
  async shouldNotExistUniqueNameBar(ctx: BaseCrudContext) {
    const { uniqueName } = ctx.dto;
    const id = ctx?.id || 0;
    ctx.id = { where: { uniqueName, id: Not(id) } };
    await this.findOneAndFail(ctx);
    ctx.id = id;
    return ctx;
  }

  @Before('create')
  @Before('update')
  async setShortname(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { shortName } = dto as Bar;
    if (shortName) {
      ctx.dto.shortName = toShortName(shortName);
    }
  }
  @Before('update')
  @Before('create')
  async shouldNotExistShortNameBar(ctx: BaseCrudContext) {
    const { shortName } = ctx.dto;
    const id = ctx?.id || 0;
    ctx.id = { where: { shortName, id: Not(id) } };
    await this.findOneAndFail(ctx);
    ctx.id = id;
    return ctx;
  }
}
