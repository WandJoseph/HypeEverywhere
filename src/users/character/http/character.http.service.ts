import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { After, BaseCrudContext } from '~/utils/crud';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { Character } from '../entities/character.entity';

@Injectable()
export class CharacterHttpService extends CrudHttpService<Character> {
  constructor(
    @InjectRepository(Character) private readonly repo: Repository<Character>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(repo);
  }

  @After('create')
  async emitEvent(ctx: BaseCrudContext) {
    this.eventEmitter.emit('character:created', {
      character: ctx.entity,
    });
  }
}
