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

  @Command({ name: 'findOne', description: 'Criação de um novo Atributo' })
  findOne() {}
  @Command({ name: 'findAll', description: 'Criação de um novo Atributo' })
  findAll() {}
}
