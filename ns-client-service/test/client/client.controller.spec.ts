import { ClientService } from '../../src/client/client.service';
import { Test } from '@nestjs/testing';
import { ClientModule } from '../../src/client/client.module';
import { DatabaseModule } from '../../src/db/database.module';
import { ClientCreateDto } from '../../src/client/dto/client.createDto';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';



describe("Client Controller Test", () => {
  let app: INestApplication
  let clientService: ClientService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ClientModule,
        DatabaseModule
      ],
    }).compile();
    app = moduleRef.createNestApplication()
    await app.init()
    clientService = moduleRef.get(ClientService);
  });

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await clientService.deleteAll()
  })

  it("[GET] Should return all clients", async () => {

    const tanosSave: ClientCreateDto = {
      name: "Tanos",
      address: "Titan"
    }

    const tonySave: ClientCreateDto = {
      name: "Tony Stark",
      address: "Genius, Billionaire, Playboy, Philanthropist"
    }

    const tanos = await clientService.create(tanosSave, 1)
    const tony = await clientService.create(tonySave, 2)
    const array = [tanos, tony]
    await request(app.getHttpServer())
      .get('/api/clients')
      .expect(302)
      .expect(array);
  });

  it("[GET/:id] Should return client by Id", async () => {

    const tanosSave: ClientCreateDto = {
      name: "Tanos",
      address: "Titan"
    }

    const tonySave: ClientCreateDto = {
      name: "Tony Stark",
      address: "Genius, Billionaire, Playboy, Philanthropist"
    }

    const tanos = await clientService.create(tanosSave, 1)
    const tony = await clientService.create(tonySave, 2)
    await request(app.getHttpServer())
      .get(`/api/clients/${tanos.id}`)
      .expect(302)
      .expect(tanos);
  });

  it("[GET/:id] Should return non found when not found by Id", async () => {

    const tanosSave: ClientCreateDto = {
      name: "Tanos",
      address: "Titan"
    }

    const tonySave: ClientCreateDto = {
      name: "Tony Stark",
      address: "Genius, Billionaire, Playboy, Philanthropist"
    }

    const tanos = await clientService.create(tanosSave, 1)
    const tony = await clientService.create(tonySave, 2)
    await request(app.getHttpServer())
      .get(`/api/clients/1333`)
      .expect(404);
  });

  it("[POST] Should create clients", async () => {

    const tanosSave: ClientCreateDto = {
      name: "Tanos",
      address: "Titan"
    }
    await request(app.getHttpServer())
      .post(`/api/clients`)
      .set('tenantId', '1')
      .send(tanosSave)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
      });

    const allSaved = await clientService.findAll()
    expect(allSaved).toHaveLength(1)
    expect(allSaved[0].id).not.toBe(null)
    expect(allSaved[0].name).toBe("Tanos")
    expect(allSaved[0].address).toBe("Titan")
    expect(allSaved[0].tenantId).toBe(1)
  });

  it("[PUT] Should update clients by id", async () => {
    const tanosSave: ClientCreateDto = {
      name: "TanosNotChanged",
      address: "TitanNotChanged"
    }
    const tanos = await clientService.create(tanosSave, 1)

    const updateDto: ClientCreateDto = {
      name: "ChangedTanos",
      address: "ChangedTitan"
    }

    await request(app.getHttpServer())
      .put(`/api/clients/${tanos.id}`)
      .set('tenantId', '12')
      .send(updateDto)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id')
      });

    const allSaved = await clientService.findAll()
    expect(allSaved).toHaveLength(1)
    expect(allSaved[0].id).not.toBe(null)
    expect(allSaved[0].name).toBe("ChangedTanos")
    expect(allSaved[0].address).toBe("ChangedTitan")
    expect(allSaved[0].tenantId).toBe(12)
  });

  it("[PUT] Should return 404 when not found by id", async () => {
    const tanosSave: ClientCreateDto = {
      name: "TanosNotChanged",
      address: "TitanNotChanged"
    }
    const tanos = await clientService.create(tanosSave, 1)

    const updateDto: ClientCreateDto = {
      name: "ChangedTanos",
      address: "ChangedTitan"
    }

    await request(app.getHttpServer())
      .put(`/api/clients/${111}`)
      .set('tenantId', '12')
      .send(updateDto)
      .expect(404);

    const allSaved = await clientService.findAll()
    expect(allSaved).toHaveLength(1)
    expect(allSaved[0].id).not.toBe(null)
    expect(allSaved[0].name).toBe("TanosNotChanged")
    expect(allSaved[0].address).toBe("TitanNotChanged")
    expect(allSaved[0].tenantId).toBe(1)
  });

  it("[DELETE] Should delete by Id", async () => {
    const tanosSave: ClientCreateDto = {
      name: "TanosNotChanged",
      address: "TitanNotChanged"
    }
    const tonySave: ClientCreateDto = {
      name: "Tony Stark",
      address: "Not deleted"
    }

    const tanos = await clientService.create(tanosSave, 1)
    const tony = await clientService.create(tonySave, 2)


    await request(app.getHttpServer())
      .delete(`/api/clients/${tanos.id}`)
      .expect(204);

    const allSaved = await clientService.findAll()
    expect(allSaved).toHaveLength(1)
    expect(allSaved[0].id).not.toBe(null)
    expect(allSaved[0].name).toBe("Tony Stark")
    expect(allSaved[0].address).toBe("Not deleted")
    expect(allSaved[0].tenantId).toBe(2)
  });


});