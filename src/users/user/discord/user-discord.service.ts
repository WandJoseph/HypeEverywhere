import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Before } from '~/utils/crud';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { User } from '../entities/user.entity';

export class UserDiscordService extends DiscordCrudService<User> {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {
    super(repo);
  }

  @Before('create')
  async shouldNotExistUser(ctx: DiscordCrudContext) {
    await this.findOneAndFail(ctx, 'você já está registrado :smile:!');
  }
  @Before('findOne')
  async shouldExistUser(ctx: DiscordCrudContext) {
    await this.findOneOrFail(ctx);
  }
}
