import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { BaseCrudContext, Before } from '~/utils/crud';
import BaseCrudService from '~/utils/crud/base-crud.service';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService extends HttpCrudService<Attribute> {
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
    const uniqueName = name.toLowerCase().replace(/\s/g, '-');
    ctx.dto.uniqueName = uniqueName;
  }

  @Before('update')
  @Before('create')
  async shouldNotExistUniqueNameAttribute(ctx: BaseCrudContext) {
    const { uniqueName } = ctx.dto;
    const id = ctx.id;
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
    ctx.dto.shortName = shortName.toUpperCase();
  }

  @Before('update')
  @Before('create')
  async shouldNotExistShortNameAttribute(ctx: BaseCrudContext) {
    const { shortName } = ctx.dto;
    const id = ctx.id;
    ctx.id = { where: { shortName, id: Not(id) } };
    await this.findOneAndFail(ctx);
    ctx.id = id;
    return ctx;
  }
}
