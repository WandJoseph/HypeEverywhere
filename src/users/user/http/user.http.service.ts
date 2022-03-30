import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { After, BaseCrudContext } from '~/utils/crud';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserHttpService extends HttpCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(repo);
  }

  @After('create')
  async emitEvent(ctx: BaseCrudContext) {
    this.eventEmitter.emit('user:created', {
      user: ctx.entity,
    });
  }
}
