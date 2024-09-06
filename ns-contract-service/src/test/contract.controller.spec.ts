import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';

describe('ContractController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }));
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
            signDate: new Date(),
            clientId: 'client1',
            tenantId: 'tenant1',
          })
          .expect(200)
          .then((response) => {
            expect(response.body.number).toBe('54321');
          });
      });
  });  

  it('/contracts/:id (GET) - not found', () => {
    return request(app.getHttpServer())
      .get('/contracts/e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Contract with id e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f not found');
      });
  });

  it('/contracts (POST) - bad request', () => {
    const testData = { signDate: new Date() };
    return request(app.getHttpServer())
      .post('/contracts')
      .send(testData)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toContain('clientId should not be empty');
        expect(response.body.message).toContain('tenantId should not be empty');
      });
  });

  it('/contracts/:id (PUT) - not found', () => {
    return request(app.getHttpServer())
      .put('/contracts/e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f')
      .send({
        number: '54321',
        signDate: new Date(),
        clientId: 'client1',
        tenantId: 'tenant1',
      })
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Contract with id e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f not found');
      });
  });
  

  it('/contracts/:id (DELETE) - not found', () => {
    return request(app.getHttpServer())
      .delete('/contracts/e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Contract with id e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f not found');
      });
  });
});
