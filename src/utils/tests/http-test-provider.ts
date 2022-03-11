import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

export class HttpTestProvider {
  constructor(
    private readonly app: INestApplication,
    private readonly moduleRef: TestingModule,
  ) {}

  async post(url: string, body?: any) {
    return await request(this.app.getHttpServer()).post(url).send(body);
  }
  async get(url: string, body?: any) {
    return await request(this.app.getHttpServer()).get(url).send(body);
  }
  async patch(url: string, body?: any) {
    return await request(this.app.getHttpServer()).patch(url).send(body);
  }
  async delete(url: string, body?: any) {
    return await request(this.app.getHttpServer()).delete(url).send(body);
  }
}
