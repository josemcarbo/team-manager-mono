import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Users', () => {
  let moduleRef: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users/signup`, async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        firstName: 'john',
        lastName: 'doe',
        email: 'john@email.com',
        password: '123',
      });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: 'john',
        lastName: 'doe',
        email: 'john@email.com',
      }),
    );
  });

  afterAll(async () => {
    moduleRef.close();
  });
});
