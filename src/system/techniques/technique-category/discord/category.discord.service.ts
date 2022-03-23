import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryDiscordService extends DiscordCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {
    super(repo);
  }
}
