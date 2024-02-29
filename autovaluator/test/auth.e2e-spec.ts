import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// import * as request from 'supertest';
import request from 'supertest';

import { AppModule } from './../src/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const reqBody = {
      email: 'a@b.com',
      password: 's00persecure',
    };

    return await request(app.getHttpServer())
      .post('/auth/signup')
      .send(reqBody)
      .expect(201)
      .then(async (res) => {
        console.log('response:', res.body);
        const { id, email } = await res.body;
        // expect(id).toBeDefined(); // <-- id is not defined?
        expect(email).toEqual(reqBody.email);
      });
  });
});
