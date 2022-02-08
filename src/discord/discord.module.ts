import { DynamicModule, Module } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import { DiscordOptions } from './discord-options.interface';

@Module({})
export class DiscordModule {
  static forRoot(options: DiscordOptions): DynamicModule {
    const client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    client.login(options.token);
    return {
      module: DiscordModule,
      providers: [
        {
          provide: Client,
          useValue: client,
        },
      ],
      exports: [Client],
    };
  }
}
