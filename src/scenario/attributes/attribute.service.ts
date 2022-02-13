import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  async setupUniqueName(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { name } = dto as Attribute;
    const uniqueName = name.toLowerCase().replace(/\s/g, '-');
    ctx.options = { where: { uniqueName } };
    ctx.dto.uniqueName = uniqueName;
    await this.findOneAndFail(ctx);

    return ctx;
  }
}
