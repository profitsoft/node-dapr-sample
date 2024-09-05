import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('ContractController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/contracts (GET)', () => {
    return request(app.getHttpServer())
      .get('/contracts')
      .expect(200)
      .expect([]);
  });

  it('/contracts (POST)', () => {
    return request(app.getHttpServer())
      .post('/contracts')
      .send({
        number: '12345',
        signDate: new Date(),
        clientId: 'client1',
        tenantId: 'tenant1',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
      });
  });

  it('/contracts/:id (PUT)', () => {
    return request(app.getHttpServer())
      .post('/contracts')
      .send({
        number: '12345',
        signDate: new Date(),
        clientId: 'client1',
        tenantId: 'tenant1',
      })
      .expect(201)
      .then((response) => {
        const contractId = response.body.id;

        return request(app.getHttpServer())
          .put(`/contracts/${contractId}`)
          .send({
            number: '54321',
          })
          .expect(200)
          .then((response) => {
            expect(response.body.number).toBe('54321');
          });
      });
  });
});
