import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudContext, Before } from '~/utils/crud';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { User } from '../entities/user.entity';

export class UserDiscordService extends DiscordCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  @Before('create')
  async shouldNotExistUser(ctx: DiscordCrudContext) {
    await this.findOneAndFail(ctx, 'Você já está registrado');
  }
}
