import {
  Client,
  Guild as DiscordGuild,
  Intents,
  Message,
  TextChannel,
  User,
} from 'discord.js';
import { Guild } from '~/guilds/entities/guild.entity';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import {
  DiscordCommandMetadataHandler,
  Parameter,
} from './decorator/commands.decorator';
import {
  ControllerOptions,
  DiscordControllerMetadataHandler,
} from './decorator/discord-controller.decorator';
import { DiscordOptions } from './discord-options.interface';

interface Commands {
  [command: string]: {
    methodKey: string;
    name: string;
    description?: string;
    aliases?: string[];
    parameters: Parameter[];
  };
}

export class DiscordEventProvider {
  private client: Client;
  private generated_commands?: Commands;

  constructor(private readonly options: DiscordOptions) {
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  async init() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
    });
    await this.client.login(this.options.token);
    this.onMessage();
  }

  get controllers() {
    const handler = new DiscordControllerMetadataHandler();
    return handler.getControllers();
  }
  getControllerOptions(controller?: any): ControllerOptions {
    const handler = new DiscordControllerMetadataHandler();
    return handler.getOptions(controller);
  }
  getControllerCommandMethodKeys(controller: any) {
    const handler = new DiscordCommandMetadataHandler(controller);
    return handler.getCommands();
  }
  getCommandOptions(controller: any, propertyKey: string) {
    const handler = new DiscordCommandMetadataHandler(controller);
    return handler.getCommandOptions(propertyKey);
  }
  getCommandParameters(controller: any, propertyKey: string) {
    const handler = new DiscordCommandMetadataHandler(controller);
    return handler.getCommandParameters(propertyKey);
  }
  getCommands(controller: any): Commands {
    const cmdMethods = this.getControllerCommandMethodKeys(controller);
    const commands: Commands = {};
    for (const methodKey of cmdMethods) {
      const options = this.getCommandOptions(controller, methodKey);
      const parameters = this.getCommandParameters(controller, methodKey);
      const commandName = options.name;
      const aliases = options.aliases || [];
      commands[commandName] = {
        name: commandName,
        methodKey,
        description: options.description,
        parameters,
      };
      for (const alias of aliases) {
        commands[alias] = {
          name: commandName,
          methodKey,
          description: options.description,
          parameters,
        };
      }
    }
    return commands;
  }

  getGuild(guild: DiscordGuild): Guild {
    // Get Guild from database
    return new Guild();
  }

  mountArguments(
    parameters: Parameter[],
    options: {
      message?: Message;
      author?: User;
      channel?: TextChannel;
      args?: string[];
      command?: string;
      content?: string;
    },
  ) {
    const args = [];
    for (const parameter of parameters) {
      if (parameter.type === 'message') {
        args[parameter.index] = options.message;
      } else if (parameter.type === 'author') {
        args[parameter.index] = options.author;
      } else if (parameter.type === 'channel') {
        args[parameter.index] = options.channel;
      } else if (parameter.type === 'args') {
        args[parameter.index] = options.args;
      }
    }
    return args;
  }

  async onMessageErrorHandler(message: Message, error: any) {
    const ctx: DiscordCrudContext = error?.ctx;
    if (!ctx) {
      const formatedResponse = `${message.author}, ${error.message}`;
      await message.channel.send(formatedResponse);
      return;
    }
    const type = error.error;
    const errorMessage = error.message;
    const responseAuthor = ctx.author || message.author;
    const responseChannel = ctx.responseChannel;
    const formatedResponse = `${responseAuthor}, ${errorMessage} - \`${type}\``;
    if (responseChannel) {
      await responseChannel.send(formatedResponse);
    } else if (ctx.msg) {
      await ctx.msg.edit(formatedResponse);
    } else {
      await message.channel.send(formatedResponse);
    }
  }

  onMessage() {
    const helpCommand: {
      [key: string]:
        | {
            [command: string]: string;
          }
        | string;
    } = {};
    for (const controller of this.controllers) {
      const commands = this.getCommands(controller);
      const { collection } = this.getControllerOptions(controller);
      if (collection) {
        helpCommand[collection] = {};
        for (const command of Object.keys(commands)) {
          helpCommand[collection][command] = commands[command].description;
        }
      } else {
        for (const command of Object.keys(commands)) {
          helpCommand[command] = commands[command].description;
        }
      }

      this.client.on('messageCreate', async (message) => {
        // SE FOR UM BOT
        if (message.author.bot) return;
        // SE NÃO FOR NA GUILD
        if (!message.guild) return;
        const guild = this.getGuild(message.guild);
        if (!guild) return;
        const prefix = guild.prefix || '!';
        // SE NÃO COMEÇAR COM O PREFIXO
        if (!message.content.startsWith(prefix)) return;
        // REMOVENDO O PREFIXO DO CONTENT
        let messageContent = message.content.slice(prefix.length);
        // COLLECTION
        if (!collection) {
          const command = messageContent.split(' ')[0].toLowerCase();
          if (commands[command]) {
            const content = messageContent.slice(command.length + 1);
            const cmd = commands[command];
            const args = this.mountArguments(cmd.parameters, {
              args: content.split(' '),
              message,
              author: message.author,
              channel: message.channel as TextChannel,
              command: command,
              content,
            });
            try {
              await controller[cmd.methodKey](...args);
            } catch (error) {
              await this.onMessageErrorHandler(message, error);
            }
          }
          return;
        }
        // SE FOR COLLECTION
        if (!messageContent.startsWith(collection + ' ')) {
          return;
        }
        messageContent = messageContent.slice(collection.length + 1);
        const command = messageContent.split(' ')[0].toLowerCase();
        let cmd = commands[command];
        if (cmd) {
          messageContent = messageContent.slice(command.length + 1);
        } else {
          cmd = commands['default'];
        }
        if (cmd) {
          const content = messageContent;
          const args = this.mountArguments(cmd.parameters, {
            args: content.split(' '),
            message,
            author: message.author,
            channel: message.channel as TextChannel,
            command: command,
            content,
          });
          try {
            await controller[cmd.methodKey](...args);
          } catch (error) {
            await this.onMessageErrorHandler(message, error);
          }
        }
      });
    }
    this.client.on('messageCreate', async (message) => {
      // SE FOR UM BOT
      if (message.author.bot) return;
      // SE NÃO FOR NA GUILD
      if (!message.guild) return;
      const guild = this.getGuild(message.guild);
      if (!guild) return;
      const prefix = guild.prefix || '!';
      // SE NÃO COMEÇAR COM O PREFIXO
      if (!message.content.startsWith(prefix)) return;
      // REMOVENDO O PREFIXO DO CONTENT
      const content = message.content.slice(prefix.length);
      if (content.startsWith('help')) {
        let helpMessage = `${message.author}\n`;
        for (const key of Object.keys(helpCommand)) {
          if (typeof helpCommand[key] === 'string') {
            helpMessage += `**${prefix}${key}**: ${helpCommand[key]}\n`;
          } else {
            helpMessage += `**${key}**:\n`;
            for (const command of Object.keys(helpCommand[key])) {
              helpMessage += `\t**${prefix}${key} ${
                command === 'default' ? '' : command
              }**:  ${helpCommand[key][command]}\n`;
            }
          }
        }
        await message.channel.send(helpMessage);
      }
    });
  }
}
// const discordConfig = async () => {
//   const client = getClient();
//   const controllers = Reflect.getMetadata(
//     'discord.controllers:controllers',
//     DiscordModule,
//   );
//   for (const controller of controllers) {
//     const handler = new CommandDecoratorHandler(controller);
//     const commandMethodKeys = handler.getCommands();
//     const commands: {
//       [key: string]: [
//         options: CommandOptions,
//         parameters: Parameter[],
//         key: string,
//       ];
//     } = {};
//     commandMethodKeys.forEach((key) => {
//       const options = handler.getCommandOptions(key);
//       const parameters = handler.getCommandParameters(key);
//       commands[options.name] = [options, parameters, key];
//       if (options.aliases) {
//         for (const alias of options?.aliases) {
//           commands[alias] = [options, parameters, key];
//         }
//       }
//     });
//     client.on('messageCreate', async (msg) => {
//       if (msg.author.bot) return;
//       const command = msg.content.split(' ')[0].toLowerCase();
//       if (commands[command]) {
//         const [options, parameters, key] = commands[command];
//         const args = [];
//         for (const parameter of parameters) {
//           if (parameter.type === 'message') {
//             args[parameter.index] = msg;
//           }
//           if (parameter.type === 'author') {
//             args[parameter.index] = msg.author;
//           }
//           if (parameter.type === 'channel') {
//             args[parameter.index] = msg.channel;
//           }
//           if (parameter.type === 'args') {
//             const argsList = msg.content.split(' ').slice(1);
//             args[parameter.index] = argsList;
//           }
//         }
//
//       }
//     });
//   }
// };
