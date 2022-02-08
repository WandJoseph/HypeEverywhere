import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

const validatorConfig = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe(validationOptions));
};
export const appConfig = (app: INestApplication) => {
  swaggerConfig(app);
  validatorConfig(app);
  return app;
};
