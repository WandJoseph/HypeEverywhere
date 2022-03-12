import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserHttpService extends HttpCrudService<User> {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super(repo);
  }
}
