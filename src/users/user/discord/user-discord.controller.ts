import { Controller } from '@nestjs/common';
import { TextChannel, User } from 'discord.js';
import { Author, Channel, Command, DiscordController } from '~/discord';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { UserDiscordService } from './user-discord.service';

@DiscordController()
@Controller()
export class UserDiscordController {
  constructor(private readonly service: UserDiscordService) {}

  @Command({ name: 'register', description: 'Registre-se como um usuário' })
  async create(@Author() author: User, @Channel() channel: TextChannel) {
    const msg = await channel.send(
      `${author.username} Verificando seu registro!`,
    );
    const ctx: DiscordCrudContext = {
      id: author.id,
      msg,
      dto: {
        id: author.id,
      },
    };
    await this.service.create(ctx);
    await msg.edit(`${author.username} Você se cadastrou com sucesso!`);
  }
  @Command({
    name: 'vida',
    aliases: ['hp'],
    description: 'Vida do Personagem',
  })
  async getVida(@Author() author: User, @Channel() channel: TextChannel) {
    const msg = await channel.send('Verificando sua vida!');
    const ctx: DiscordCrudContext = {
      id: author.id,
      author,
    };
    const user = await this.service.findOne(ctx);
    await msg.edit(`${author} Sua vida é ${user.vida}`);
  }
}
