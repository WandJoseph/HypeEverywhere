import { Controller } from '@nestjs/common';
import { TextChannel } from 'discord.js';
import { Channel, Command, DiscordController } from '~/discord';
import { AttributeDiscordService } from './attribute-discord.service';

@DiscordController({
  collection: 'atb',
})
@Controller()
export class AttributeDiscordController {
  constructor(private readonly service: AttributeDiscordService) {}

  @Command({
    name: 'findOne',
    description: 'Criação de um novo Atributo',
    aliases: ['show', 'atb'],
  })
  findOne() {}
  @Command({
    name: 'findAll',
    aliases: ['oloco'],
    description: 'Criação de um novo Atributo',
  })
  async findAll(@Channel() channel: TextChannel) {
    await channel.send('Olá bem vindo');
  }
}
