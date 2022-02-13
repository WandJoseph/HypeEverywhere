import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EmbedField } from 'discord.js';
import { Repository } from 'typeorm';
import BaseCrudService from './base-crud.service';
import { DiscordCrudContext } from './discord-crud.context.interface';

export class HttpCrudService<Entity> extends BaseCrudService<Entity> {
  constructor(protected readonly __repo: Repository<Entity>) {
    super(__repo);
  }
  async findOneOrFail(ctx?: DiscordCrudContext): Promise<Entity | undefined> {
    ctx = await this.baseFindOne(ctx);
    if (!ctx.entity) {
      throw new NotFoundException(
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
      throw new BadRequestException(
        message || `That ${this.entityName || 'entity'} already exists`,
      );
    }
    return ctx.entity;
  }
}
