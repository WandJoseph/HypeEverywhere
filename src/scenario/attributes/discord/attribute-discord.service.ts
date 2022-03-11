import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeDiscordService extends DiscordCrudService<Attribute> {
  constructor(
    @InjectRepository(Attribute)
    private readonly repo: Repository<Attribute>,
  ) {
    super(repo);
  }
}
