import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import { ClientService } from '../src/client/client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../src/client/client.controller';
import { ClientEntity } from '../src/client/client.entity';
import request from 'supertest';
import { ClientCreateDto } from '../src/client/dto/client.createDto';



describe("ClientController", () => {
  let app: INestApplication;
  let clientService: ClientService;

  const client1 = new ClientEntity()
  client1.id = 1
  client1.name = "Tanos"
  client1.address = "Titan"
  client1.tenantId = 1

  const client2 = new ClientEntity()
  client2.id = 2
  client2.name = "Kratos"
  client2.address = "Sparta"
  client2.tenantId = 12

  const mockClients = [client1, client2]


  beforeEach(async () => {
    const a = new ClientEntity()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockClients),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    clientService = module.get<ClientService>(ClientService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /clients", () => {
    it('success - should return all clients ', async () => {
      const response = await request(app.getHttpServer())
        .get("/api/clients")
        .expect(302);

      const expected = mockClients.map((client) => ({
        ...client,
      }));

      expect(response.body).toEqual(expected);
      expect(clientService.findAll).toHaveBeenCalled();
    });
  })

  describe("GET /clients/:id", () => {
    it('success - should return a client by ID ', async () => {
      jest.spyOn(clientService, "findById").mockResolvedValue(client1);

      const response = await request(app.getHttpServer())
        .get("/api/clients/1")
        .expect(302);

      expect(response.body).toEqual({
        ...client1,
      });
      expect(clientService.findById).toHaveBeenCalledWith("1");
    });

    it("failure - client not found", async () => {
      jest
        .spyOn(clientService, "findById")
        .mockRejectedValue(
          new NotFoundException(`Client with id 111 not found`),
        );

      const response = await request(app.getHttpServer())
        .get(`/api/clients/111`)
        .expect(404);

      expect(response.body.message).toEqual(
        `Client with id 111 not found`,
      );
      expect(clientService.findById).toHaveBeenCalledWith("111");
    });
  })

  describe("POST /clients", () => {
    it("success - should create a new client", async () => {
      const clientSaveDto: ClientCreateDto = {
        name: "NewName",
        address: "NewAddress"
      };

      const createdClient = new ClientEntity();
      createdClient.id = 1
      createdClient.tenantId = 1
      createdClient.name = clientSaveDto.name
      createdClient.address = clientSaveDto.address
      jest.spyOn(clientService, "create").mockResolvedValue(createdClient);

      const response = await request(app.getHttpServer())
        .post("/api/clients")
        .set('tenantId', '1')
        .send(clientSaveDto)
        .expect(201);

      expect(response.body).toEqual({
        ...createdClient,
      });
      expect(clientService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...clientSaveDto,
        }),
        expect.any(Number)
      );
    });
  });

  describe("PUT /clients", () => {
    it("success - should update a contract", async () => {
      const clientSaveDto: ClientCreateDto = {
        name: "NewName",
        address: "NewAddress"
      };
      const updatedClient = new ClientEntity();
      updatedClient.id = 1
      updatedClient.tenantId = 12
      updatedClient.name = clientSaveDto.name
      updatedClient.address = clientSaveDto.address

      jest.spyOn(clientService, "update").mockResolvedValue(updatedClient);

      const response = await request(app.getHttpServer())
        .put(`/api/clients/1`)
        .send(clientSaveDto)
        .set('tenantId', '12')
        .expect(200);

      expect(response.body).toEqual({
        ...updatedClient,
      });
      expect(clientService.update).toHaveBeenCalledWith(
        expect.objectContaining({
          ...clientSaveDto,
        }),
        "1",
        expect.any(Number)
      );
    });

    it("failure - client not found", async () => {
      const clientSaveDto: ClientCreateDto = {
        name: "NewName",
        address: "NewAddress"
      };

      jest
        .spyOn(clientService, "update")
        .mockRejectedValue(
          new NotFoundException(`Client with id 1 not found`),
        );

      const response = await request(app.getHttpServer())
        .put(`/api/clients/1`)
        .send({
          ...clientSaveDto,
        })
        .expect(404);

      expect(response.body.message).toEqual(
        `Client with id 1 not found`,
      );
      expect(clientService.update).toHaveBeenCalledWith(
        expect.objectContaining({
          ...clientSaveDto,
        }),
        "1",
        expect.any(Number)
      );
    });
  });

  describe("DELETE /clients", () => {
    it("success - should delete a client", async () => {
      jest.spyOn(clientService, "delete").mockResolvedValue(undefined);
      await request(app.getHttpServer())
        .delete(`/api/clients/1`)
        .expect(204);
      expect(clientService.delete).toHaveBeenCalledWith("1");
    });
  });

});