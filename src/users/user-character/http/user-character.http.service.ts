import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '~/users/character/entities/character.entity';
import { UserHttpService } from '~/users/user/http/user.http.service';
import { NestedInUserService } from '~/users/user/nested-in-user.service.interface';
import { After, BaseCrudContext, Before } from '~/utils/crud';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { AppEventEmitter, Event } from '~/utils/events';

@Injectable()
export class UserCharacterHttpService
  extends HttpCrudService<Character>
  implements NestedInUserService<Character>
{
  constructor(
    @InjectRepository(Character)
    private readonly repo: Repository<Character>,
    private readonly userHttpService: UserHttpService,
    @Inject(EventEmitter2)
    private readonly eventEmitter: AppEventEmitter,
  ) {
    super(repo);
  }
  @Before('all')
  async shouldExistUser(ctx: BaseCrudContext) {
    const { userId } = ctx.params;
    await this.userHttpService.findOneOrFail({
      id: userId,
    });
  }

  @Before('create')
  @Before('update')
  async setOwnerId(ctx: BaseCrudContext) {
    const userId = ctx?.params?.userId;
    ctx.dto.ownerId = userId;
  }
  @After('create')
  async emitEvent(ctx: BaseCrudContext) {
    this.eventEmitter.emit(Event.CHARACTER_CREATED, {
      character: ctx.entity,
    });
  }
}
