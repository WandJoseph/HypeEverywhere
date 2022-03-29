import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { toUniqueString } from '~/utils';
import { Before, BaseCrudContext } from '~/utils/crud';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { NestedInTechniqueCHS } from '../../technique/http/nested-in-technique.interface';
import { TechniqueHttpService } from '../../technique/http/technique.http.service';
import { Effect } from '../entities/effect.entity';

@Injectable()
export class TechniqueEffectHttpService
  extends HttpCrudService<Effect>
  implements NestedInTechniqueCHS<Effect>
{
  constructor(
    @InjectRepository(Effect)
    private readonly repo: Repository<Effect>,
    private readonly techniqueHttpService: TechniqueHttpService,
  ) {
    super(repo);
  }
  @Before('all')
  async shouldExistTechnique(ctx: BaseCrudContext) {
    const { techniqueId } = ctx.params;
    await this.techniqueHttpService.findOneOrFail({
      id: techniqueId,
    });
  }
  @Before('create')
  @Before('update')
  async setUniqueName(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const { name } = dto as Effect;
    if (name) {
      ctx.dto.uniqueName = toUniqueString(name);
    }
  }
  @Before('create')
  @Before('update')
  async setTechniqueId(ctx: BaseCrudContext) {
    const techniqueId = ctx?.params?.techniqueId;
    ctx.dto.techniqueId = techniqueId;
  }

  @Before('update')
  @Before('create')
  async shouldNotExistUniqueNameEffect(ctx: BaseCrudContext) {
    const { uniqueName } = ctx.dto;
    const id = ctx?.id || 0;
    await this.findOneAndFail({
      id: { where: { uniqueName, id: Not(id) } },
    });
    return ctx;
  }
}
