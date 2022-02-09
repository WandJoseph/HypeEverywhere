import { DynamicModule, Global, Module, ConsoleLogger } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import { DiscordOptions } from './discord-options.interface';

@Global()
@Module({
  providers: [ConsoleLogger],
})
export class DiscordModule {
  static client: Client;
  static async forRoot(options: DiscordOptions): Promise<DynamicModule> {
    const client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
    await client.login(options.token);

    DiscordModule.client = client;
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

export const getClient = () => {
  return DiscordModule.client;
};
