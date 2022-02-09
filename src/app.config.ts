import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  CommandDecoratorHandler,
  CommandOptions,
  DiscordModule,
  getClient,
  Parameter,
} from './discord';
import { DiscordCrudContext } from './utils/crud/discord-crud.context.interface';
import { validationOptions } from './utils/validator/validation-options';

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

const discordConfig = async () => {
  const client = getClient();
  const controllers = Reflect.getMetadata(
    'discord.controllers:controllers',
    DiscordModule,
  );
  for (const controller of controllers) {
    const handler = new CommandDecoratorHandler(controller);
    const commandMethodKeys = handler.getCommands();
    const commands: {
      [key: string]: [
        options: CommandOptions,
        parameters: Parameter[],
        key: string,
      ];
    } = {};
    commandMethodKeys.forEach((key) => {
      const options = handler.getCommandOptions(key);
      const parameters = handler.getCommandParameters(key);
      commands[options.name] = [options, parameters, key];
      if (options.aliases) {
        for (const alias of options?.aliases) {
          commands[alias] = [options, parameters, key];
        }
      }
    });
    client.on('messageCreate', async (msg) => {
      if (msg.author.bot) return;
      const command = msg.content.split(' ')[0];
      if (commands[command]) {
        const [options, parameters, key] = commands[command];
        const args = [];
        for (const parameter of parameters) {
          if (parameter.type === 'message') {
            args[parameter.index] = msg;
          }
          if (parameter.type === 'author') {
            args[parameter.index] = msg.author;
          }
          if (parameter.type === 'channel') {
            args[parameter.index] = msg.channel;
          }
        }
        try {
          await controller[key](...args);
        } catch (error) {
          const ctx: DiscordCrudContext = error.ctx;
          const type = error.error;
          const message = error.message;
          const responseAuthor = ctx.author || msg.author;
          const responseChannel = ctx.responseChannel;
          const formatedResponse = `${responseAuthor}, ${message} - \`${type}\``;
          if (responseChannel) {
            await responseChannel.send(formatedResponse);
          } else if (ctx.msg) {
            await ctx.msg.edit(formatedResponse);
          } else {
            await msg.channel.send(formatedResponse);
          }
        }
      }
    });
  }
};

const validatorConfig = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe(validationOptions));
};
export const appConfig = async (app: INestApplication) => {
  swaggerConfig(app);
  validatorConfig(app);
  await discordConfig();
  return app;
};
