import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { appConfig } from '~/app.config';
import { DatabaseModule } from '~/database/database.module';
import { HttpTestProvider } from './http-test-provider';

export const CreateApplication = async (metadata?: ModuleMetadata) => {
  const moduleRef = await Test.createTestingModule({
    imports: [ConfigModule.forRoot(), DatabaseModule, ...metadata.imports],
  }).compile();

  const app = moduleRef.createNestApplication();
  await appConfig(app, { discord: false, swagger: false, validator: true });
  const request = new HttpTestProvider(app, moduleRef);

  return {
    app,
    moduleRef,
    request,
  };
};
