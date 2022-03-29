import { Controller } from '@nestjs/common';
import { Message, TextChannel, User } from 'discord.js';
import { Author, Channel, Command, DiscordController, Msg } from '~/discord';
import { UserDiscordService } from './user.discord.service';

@Controller('user')
@DiscordController()
export class UserDiscordController {
  constructor(private readonly service: UserDiscordService) {}

  @Command({
    name: 'register',
    description: 'Registra-se como jogador na mesa',
  })
  public async register(
    @Author() author: User,
    @Channel() channel: TextChannel,
  ) {
    const id = author.id;
    const msg = await channel.send('Registrando...');
    const user = await this.service.create({
      id,
      dto: {
        id,
      },
      msg,
    });
    await msg.edit(`Registrado!`);
  }
}
