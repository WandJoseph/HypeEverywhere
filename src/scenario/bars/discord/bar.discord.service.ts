import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { Bar } from '../entities/bar.entity';

@Injectable()
export class BarDiscordService extends DiscordCrudService<Bar> {
  constructor(
    @InjectRepository(Bar)
    private readonly repo: Repository<Bar>,
  ) {
    super(repo);
  }
}
