import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { toShortName, toUniqueString } from '~/utils';
import { BaseCrudContext, Before } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeHttpService extends CrudHttpService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private readonly repo: Repository<Attribute>,
  ) {
    super(repo);
  }
  @Before('create')
  @Before('update')
  async setUniqueName(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { name } = dto as Attribute;
    const uniqueName = toUniqueString(name);
    ctx.dto.uniqueName = uniqueName;
  }

  @Before('update')
  @Before('create')
  async shouldNotExistUniqueNameAttribute(ctx: BaseCrudContext) {
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
    const { shortName } = dto as Attribute;
    if (shortName) {
      ctx.dto.shortName = toShortName(shortName);
    }
  }
  @Before('update')
  @Before('create')
  async shouldNotExistShortNameAttribute(ctx: BaseCrudContext) {
    const { shortName } = ctx.dto;
    const id = ctx?.id || 0;
    ctx.id = { where: { shortName, id: Not(id) } };
    await this.findOneAndFail(ctx);
    ctx.id = id;
    return ctx;
  }
}
