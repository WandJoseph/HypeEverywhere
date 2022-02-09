import 'reflect-metadata';
import { Repository } from 'typeorm';
import { EntityFoundException } from '~/discord/exceptions/entity-found.exception';
import { EntityNotFoundException } from '~/discord/exceptions/entity-not-found.exception';

import BaseCrudService from './base-crud.service';
import { Before } from './decorators/base-crud.decorator';
import { DiscordCrudContext } from './discord-crud.context.interface';

export class DiscordCrudService<Entity> extends BaseCrudService<Entity> {
  constructor(protected readonly __repo: Repository<Entity>) {
    super(__repo);
  }
  async findOneOrFail(ctx?: DiscordCrudContext): Promise<Entity | undefined> {
    ctx = await this.baseFindOne(ctx);
    if (!ctx.entity) {
      throw new EntityNotFoundException(
        ctx,
        `That ${this.entityName || 'entity'} does not exist`,
      );
    }
    return ctx.entity;
  }
  async findOneAndFail(
    ctx?: DiscordCrudContext,
    message?: string,
  ): Promise<Entity | undefined> {
    ctx = await this.baseFindOne(ctx);
    if (ctx.entity) {
      throw new EntityFoundException(
        ctx,
        message || `That ${this.entityName || 'entity'} already exists`,
      );
    }
    return ctx.entity;
  }
}
