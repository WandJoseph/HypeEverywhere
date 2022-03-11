import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { CreateApplication } from '~/utils/tests/create-application';
import { HttpTestProvider } from '~/utils/tests/http-test-provider';
import { AttributeFactory } from './attribute.factory';
import { AttributesModule } from './attributes.module';

describe('Attributes tests', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let request: HttpTestProvider;
  let attributeFactory: AttributeFactory;

  beforeAll(async () => {
    ({ app, moduleRef, request } = await CreateApplication({
      imports: [AttributesModule],
    }));

    attributeFactory = new AttributeFactory();

    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should create an attribute', async () => {
    const dto = attributeFactory.dto();
    const res = await request.post(`/attribute`, dto);
    const { status, body } = res;

    expect(status).toBe(201);

    expect(body).toBeDefined();
    expect(body.id).toBeDefined();
  });
});
