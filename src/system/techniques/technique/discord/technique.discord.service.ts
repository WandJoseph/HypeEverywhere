import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { Technique } from '../entities/technique.entity';

@Injectable()
export class TechniqueDiscordService extends DiscordCrudService<Technique> {
  constructor(
    @InjectRepository(Technique)
    private readonly repo: Repository<Technique>,
  ) {
    super(repo);
  }
}
