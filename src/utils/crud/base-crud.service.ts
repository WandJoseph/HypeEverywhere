import { Repository } from 'typeorm/repository/Repository';
import 'reflect-metadata';

import { DeleteResult, FindOneOptions, ObjectID, UpdateResult } from 'typeorm';
import { FindAllQuery, FindAllResult } from './dto/find-all.dto';
import {
  BaseCrudMetadataHandler,
  CrudMethods,
  MethodKeys,
} from './decorators/base-crud.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BaseCrudContext } from './base-crud-context.interface';

export default abstract class BaseCrudService<
  Entity,
  Context extends BaseCrudContext,
> {
  private metadataHandler: BaseCrudMetadataHandler;
  private beforeMethods: CrudMethods;
  private afterMethods: CrudMethods;
  private __entityName: string;
  constructor(protected readonly __repo: Repository<Entity>) {
    this.metadataHandler = new BaseCrudMetadataHandler(this);
    this.beforeMethods = this.metadataHandler.getAllBeforeMethods();
    this.afterMethods = this.metadataHandler.getAllAfterMethods();
  }

  protected set entityName(name: string) {
    this.__entityName = name;
  }
  protected get entityName() {
    return this.__entityName || this.__repo.metadata.name;
  }

  protected entityId(...args: any[]): string {
    const first = args[0];
    if (typeof first === 'object') {
      return '';
    }
    return ` '${first}'`;
  }
  protected entityInfo(...args: any[]): string {
    return `${this.entityName}${this.entityId(...args)}`;
  }
  protected async baseBefore(
    methodKey: MethodKeys,
    ctx: Context,
  ): Promise<Context> {
    const methods = this.beforeMethods[methodKey];
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }
  protected async baseAfter(
    methodKey: MethodKeys,
    ctx: Context,
  ): Promise<Context> {
    const methods = this.afterMethods[methodKey];
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }

  protected async baseCreate(ctx: Context) {
    const { dto } = ctx;
    const data = this.__repo.create(dto as Entity);
    ctx.entity = await this.__repo.save(data);
    return ctx;
  }
  protected async baseUpdate(ctx: Context) {
    const { dto, id } = ctx;
    ctx.result = this.__repo.update(id, dto);
    return ctx;
  }
  protected async baseDelete(ctx: Context) {
    const { id } = ctx;
    ctx.result = await this.__repo.delete(id);
    return ctx;
  }
  protected async baseFindOne(ctx: Context) {
    const { id, options } = ctx;
    ctx.entity = await this.__repo.findOne(id, options);
    return ctx;
  }
  protected async baseFindAll(ctx: Context) {
    const query: FindAllQuery = ctx.query || {};
    const take = query.take || 10;
    const options = ctx.options || {};
    const skip = query.skip || 0;
    const [data, count] = await this.__repo.findAndCount({
      take,
      skip,
      ...options,
    });
    ctx.result = {
      data,
      count,
    };
    return ctx;
  }

  private baseMethods = {
    create: 'baseCreate',
    update: 'baseUpdate',
    delete: 'baseDelete',
    findOne: 'baseFindOne',
    findAll: 'baseFindAll',
  };
  async baseExecution(ctx: Context, method: MethodKeys) {
    ctx = await this.baseBefore(method, ctx);
    ctx = await this[this.baseMethods[method]](ctx);
    ctx = await this.baseAfter(method, ctx);
    return ctx;
  }

  async create(ctx: Context): Promise<Entity> {
    ctx = await this.baseExecution(ctx, 'create');
    return ctx.entity;
  }
  async update(ctx: Context): Promise<UpdateResult> {
    ctx = await this.baseExecution(ctx, 'update');
    return ctx.result;
  }
  async delete(ctx: Context): Promise<DeleteResult> {
    ctx = await this.baseExecution(ctx, 'delete');
    return ctx.result;
  }
  async findOne(ctx: Context): Promise<Entity> {
    ctx = await this.baseExecution(ctx, 'findOne');
    return ctx.entity;
  }
  async findAll(ctx: Context): Promise<FindAllResult<Entity>> {
    ctx = await this.baseExecution(ctx, 'findAll');
    return ctx.result;
  }
}
