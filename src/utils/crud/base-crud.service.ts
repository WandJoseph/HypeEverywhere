import { Repository } from 'typeorm/repository/Repository';
import { BaseCrudContext } from './base-crud-context.interface';
import 'reflect-metadata';

import {
  DeleteResult,
  FindConditions,
  FindOneOptions,
  ObjectID,
  UpdateResult,
} from 'typeorm';
import { FindAllQuery, FindAllResult } from './dto/find-all.dto';
import {
  BaseCrudMetadataHandler,
  MethodKeys,
} from './decorators/base-crud.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default class BaseCrudService<Entity> {
  private metadataHandler: BaseCrudMetadataHandler;

  constructor(private readonly repo: Repository<Entity>) {
    this.metadataHandler = new BaseCrudMetadataHandler(this);
  }
  private entityName(...args: any[]): string {
    const last = args[args.length - 1];
    if (typeof last === 'string') {
      return last;
    }
    return this.repo.metadata.targetName;
  }
  private entityId(...args: any[]): string {
    const first = args[0];
    if (typeof first === 'object') {
      return '';
    }
    return ` '${first}'`;
  }
  private entityInfo(...args: any[]): string {
    return `${this.entityName(...args)}${this.entityId(...args)}`;
  }
  private async baseBefore(
    methodKey: MethodKeys,
    ctx: BaseCrudContext,
  ): Promise<BaseCrudContext> {
    const methods = this.metadataHandler.getBeforeMethods(methodKey);
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }
  private async baseAfter(
    method: MethodKeys,
    ctx: BaseCrudContext,
  ): Promise<BaseCrudContext> {
    const methods = this.metadataHandler.getAfterMethods(method);
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }
  private async baseCreate(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const data = this.repo.create(dto as Entity);
    ctx.entity = await this.repo.save(data);
    return ctx;
  }
  private async baseUpdate(ctx: BaseCrudContext) {
    const { dto, id } = ctx;
    ctx.result = this.repo.update(id, dto);
    return ctx;
  }
  private async baseDelete(ctx: BaseCrudContext) {
    const { id } = ctx;
    ctx.result = await this.repo.delete(id);
    return ctx;
  }
  private async baseFindOne(ctx: BaseCrudContext) {
    const { id, options } = ctx;
    ctx.entity = await this.repo.findOne(id, options);
    return ctx;
  }
  private async baseFindAll(ctx: BaseCrudContext) {
    const query: FindAllQuery = ctx.query;
    const take = query.take || 10;
    const skip = query.skip || 0;
    const [data, count] = await this.repo.findAndCount({
      take,
      skip,
    });
    ctx.result = {
      data,
      count,
    };
    return ctx;
  }

  async create(dto: any, params?: any): Promise<Entity> {
    let ctx: BaseCrudContext = { dto, params };
    ctx = await this.baseBefore('create', ctx);
    ctx = await this.baseCreate(ctx);
    ctx = await this.baseAfter('create', ctx);
    return ctx.entity;
  }
  async update(id: any, dto: any, params?: any): Promise<UpdateResult> {
    let ctx: BaseCrudContext = { id, dto, params };
    ctx = await this.baseBefore('update', ctx);
    ctx = await this.baseUpdate(ctx);
    ctx = await this.baseAfter('update', ctx);
    return ctx.result;
  }
  async delete(id: any): Promise<DeleteResult> {
    let ctx: BaseCrudContext = { id };
    ctx = await this.baseBefore('delete', ctx);
    ctx = await this.baseDelete(ctx);
    ctx = await this.baseAfter('delete', ctx);
    return ctx.result;
  }
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;
  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  async findOne(...args: any[]): Promise<Entity> {
    const [id, options] = args;
    let ctx: BaseCrudContext = { id, options };
    ctx = await this.baseBefore('findOne', ctx);
    ctx = await this.baseFindOne(ctx);
    ctx = await this.baseAfter('findOne', ctx);
    return ctx.entity;
  }
  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
    name?: string,
  ): Promise<Entity | undefined>;
  findOneOrFail(
    options?: FindOneOptions<Entity>,
    name?: string,
  ): Promise<Entity | undefined>;
  async findOneOrFail(...args: any[]): Promise<Entity> {
    const [id, options] = args;
    let ctx: BaseCrudContext = { id, options };
    ctx = await this.baseBefore('findOne', ctx);
    ctx = await this.baseFindOne(ctx);
    ctx = await this.baseAfter('findOne', ctx);
    if (!ctx.entity) {
      const entityInfo = this.entityInfo(...args);
      throw new NotFoundException(`${entityInfo} not found`);
    }
    return ctx.entity;
  }
  findOneAndFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
    name?: string,
  ): Promise<Entity | undefined>;
  findOneAndFail(
    options?: FindOneOptions<Entity>,
    name?: string,
  ): Promise<Entity | undefined>;
  async findOneAndFail(...args: any[]): Promise<Entity> {
    const [id, options] = args;
    let ctx: BaseCrudContext = { id, options };
    ctx = await this.baseBefore('findOne', ctx);
    ctx = await this.baseFindOne(ctx);
    ctx = await this.baseAfter('findOne', ctx);
    if (ctx.entity) {
      const entityInfo = this.entityInfo(...args);
      throw new BadRequestException(`${entityInfo} already exists`);
    }
    return ctx.entity;
  }
  async findAll(query: FindAllQuery): Promise<FindAllResult<Entity>> {
    let ctx: BaseCrudContext = { query };
    ctx = await this.baseBefore('findAll', ctx);
    ctx = await this.baseFindAll(ctx);
    ctx = await this.baseAfter('findAll', ctx);
    return ctx.result;
  }
}
