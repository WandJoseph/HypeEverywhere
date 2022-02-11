import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscordEventProvider } from './discord/discord-event.provider';
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
  const discord = new DiscordEventProvider({
    token: process.env.DISCORD_TOKEN,
    prefix: process.env.DISCORD_PREFIX,
  });
  await discord.init();
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
