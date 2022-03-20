import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudHttpService } from '~/utils/crud/http-crud.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UserHttpService extends CrudHttpService<User> {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
    super(repo);
  }
}
