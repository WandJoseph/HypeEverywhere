import { DatabaseModule } from '~/database/database.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { appConfig } from '~/app.config';

export const getAppModule = async (...modules: any[]) => {
  const moduleRef = await Test.createTestingModule({
    imports: [DatabaseModule, ...modules],
  }).compile();
  const app = moduleRef.createNestApplication();
  appConfig(app);
  const request = new HttpTestProvider(app);

  return { app, moduleRef, request };
};

export class HttpTestProvider {
  constructor(private app: INestApplication) {}

  async post(url: string, data?: any) {
    const res = await request(this.app.getHttpServer()).post(url).send(data);
    return res;
  }
}

export abstract class TestSuite {}
