import { Repository } from 'typeorm/repository/Repository';
import { BaseCrudContext } from './base-crud-context.interface';
import 'reflect-metadata';

import { DeleteResult, FindOneOptions, ObjectID, UpdateResult } from 'typeorm';
import { FindAllQuery, FindAllResult } from './dto/find-all.dto';
import {
  BaseCrudMetadataHandler,
  CrudMethods,
  MethodKeys,
} from './decorators/base-crud.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export default abstract class BaseCrudService<Entity> {
  private metadataHandler: BaseCrudMetadataHandler;
  private beforeMethods: CrudMethods;
  private afterMethods: CrudMethods;
  private __entityName: string;
  constructor(protected readonly __repo: Repository<Entity>) {
    this.metadataHandler = new BaseCrudMetadataHandler(this);
    this.beforeMethods = this.metadataHandler.getAllBeforeMethods();
    this.afterMethods = this.metadataHandler.getAllBeforeMethods();
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
    ctx: BaseCrudContext,
  ): Promise<BaseCrudContext> {
    const methods = this.beforeMethods[methodKey];
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }
  protected async baseAfter(
    methodKey: MethodKeys,
    ctx: BaseCrudContext,
  ): Promise<BaseCrudContext> {
    const methods = this.afterMethods[methodKey];
    for (const method of methods) {
      ctx = (await this[method](ctx)) || ctx;
    }
    return ctx;
  }

  protected async baseCreate(ctx: BaseCrudContext) {
    const { dto } = ctx;
    const data = this.__repo.create(dto as Entity);
    ctx.entity = await this.__repo.save(data);
    return ctx;
  }
  protected async baseUpdate(ctx: BaseCrudContext) {
    const { dto, id } = ctx;
    ctx.result = this.__repo.update(id, dto);
    return ctx;
  }
  protected async baseDelete(ctx: BaseCrudContext) {
    const { id } = ctx;
    ctx.result = await this.__repo.delete(id);
    return ctx;
  }
  protected async baseFindOne(ctx: BaseCrudContext) {
    const { id, options } = ctx;
    ctx.entity = await this.__repo.findOne(id, options);
    return ctx;
  }
  protected async baseFindAll(ctx: BaseCrudContext) {
    const query: FindAllQuery = ctx.query;
    const take = query.take || 10;
    const skip = query.skip || 0;
    const [data, count] = await this.__repo.findAndCount({
      take,
      skip,
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
  async baseExecution(ctx: BaseCrudContext, method: MethodKeys) {
    ctx = await this.baseBefore(method, ctx);
    ctx = await this[this.baseMethods[method]](ctx);
    ctx = await this.baseAfter(method, ctx);
    return ctx;
  }

  async create(ctx: BaseCrudContext): Promise<Entity> {
    ctx = await this.baseExecution(ctx, 'create');
    return ctx.entity;
  }
  async update(ctx: BaseCrudContext): Promise<UpdateResult> {
    ctx = await this.baseExecution(ctx, 'update');
    return ctx.result;
  }
  async delete(ctx: BaseCrudContext): Promise<DeleteResult> {
    ctx = await this.baseExecution(ctx, 'update');
    return ctx.result;
  }
  async findOne(ctx: BaseCrudContext): Promise<Entity> {
    ctx = await this.baseExecution(ctx, 'findOne');
    return ctx.entity;
  }
  async findAll(ctx: BaseCrudContext): Promise<FindAllResult<Entity>> {
    ctx = await this.baseExecution(ctx, 'findAll');
    return ctx.result;
  }

  // findOneOrFail(
  //   id?: string | number | Date | ObjectID,
  //   options?: FindOneOptions<Entity>,
  //   name?: string,
  // ): Promise<Entity | undefined>;
  // findOneOrFail(
  //   options?: FindOneOptions<Entity>,
  //   name?: string,
  // ): Promise<Entity | undefined>;
  // async findOneOrFail(...args: any[]): Promise<Entity> {
  //   const [id, options] = args;
  //   let ctx: BaseCrudContext = { id, options };
  //   ctx = await this.baseBefore('findOne', ctx);
  //   ctx = await this.baseFindOne(ctx);
  //   ctx = await this.baseAfter('findOne', ctx);
  //   if (!ctx.entity) {
  //     const entityInfo = this.entityInfo(...args);
  //     throw new NotFoundException(`${entityInfo} not found`);
  //   }
  //   return ctx.entity;
  // }
  // findOneAndFail(
  //   id?: string | number | Date | ObjectID,
  //   options?: FindOneOptions<Entity>,
  //   name?: string,
  // ): Promise<Entity | undefined>;
  // findOneAndFail(
  //   options?: FindOneOptions<Entity>,
  //   name?: string,
  // ): Promise<Entity | undefined>;
  // async findOneAndFail(...args: any[]): Promise<Entity> {
  //   const [id, options] = args;
  //   let ctx: BaseCrudContext = { id, options };
  //   ctx = await this.baseBefore('findOne', ctx);
  //   ctx = await this.baseFindOne(ctx);
  //   ctx = await this.baseAfter('findOne', ctx);
  //   if (ctx.entity) {
  //     const entityInfo = this.entityInfo(...args);
  //     throw new BadRequestException(`${entityInfo} already exists`);
  //   }
  //   return ctx.entity;
  // }
}
