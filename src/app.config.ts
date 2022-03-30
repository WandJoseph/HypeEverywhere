import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DiscordEventProvider } from './discord/discord-event.provider';
import { validationOptions } from './utils/validator/validation-options';

const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder().setVersion('1.0').build();
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

interface ConfigModules {
  swagger?: boolean;
  validator?: boolean;
  discord?: boolean;
}

export const appConfig = async (
  app: INestApplication,
  { swagger, validator, discord }: ConfigModules = {
    swagger: true,
    validator: true,
    discord: true,
  },
) => {
  if (swagger) {
    swaggerConfig(app);
  }
  if (validator) {
    validatorConfig(app);
  }
  if (discord) {
    await discordConfig();
  }
  return app;
};
