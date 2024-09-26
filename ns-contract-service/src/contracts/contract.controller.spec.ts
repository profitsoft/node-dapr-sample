import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import request from 'supertest';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractDto } from './dtos/contract.dto';
import { Contract } from './contract.entity';

describe('ContractController', () => {
  let app: INestApplication;
  let contractService: ContractService;

  const existingContractId1 = 'e9d8f97a-5d5d-4b7f-9fbc-c3f633b5e18f';
  const existingContractId2 = 'a1d3f87b-4d6a-4f7a-8eac-a4d533c7e29d';
  const nonExistingContractId = '11111111-1111-1111-1111-111111111111';

  const mockContracts: Contract[] = [
    {
      id: existingContractId1,
      number: '12345',
      signDate: new Date(),
      clientId: 'client1',
      tenantId: 'tenant1',
    },
    {
      id: existingContractId2,
      number: '67890',
      signDate: new Date(),
      clientId: 'client2',
      tenantId: 'tenant2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [
        {
          provide: ContractService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockContracts),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
    contractService = module.get<ContractService>(ContractService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /contracts', () => {
    it('success - should return all contracts', async () => {
      const response = await request(app.getHttpServer())
        .get('/contracts')
        .expect(200);

      const expectedContracts = mockContracts.map((contract) => ({
        ...contract,
        signDate: contract.signDate.toISOString(),
      }));

      expect(response.body).toEqual(expectedContracts);
      expect(contractService.findAll).toHaveBeenCalled();
    });

    it('failure - should return server error', async () => {
      jest.spyOn(contractService, 'findAll').mockRejectedValue(new Error());

      await request(app.getHttpServer()).get('/contracts').expect(500);

      expect(contractService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /contracts/:id', () => {
    it('success - should return a contract by ID', async () => {
      const contractId = existingContractId1;
      const contract = mockContracts.find((c) => c.id === contractId)!;

      jest.spyOn(contractService, 'findOne').mockResolvedValue(contract);

      const response = await request(app.getHttpServer())
        .get(`/contracts/${contractId}`)
        .expect(200);

      expect(response.body).toEqual({
        ...contract,
        signDate: contract.signDate.toISOString(),
      });
      expect(contractService.findOne).toHaveBeenCalledWith(contractId);
    });

    it('failure - contract not found', async () => {
      const contractId = nonExistingContractId;
      jest.spyOn(contractService, 'findOne').mockRejectedValue(
        new NotFoundException(`Contract with id ${contractId} not found`),
      );

      const response = await request(app.getHttpServer())
        .get(`/contracts/${contractId}`)
        .expect(404);

      expect(response.body.message).toEqual(
        `Contract with id ${contractId} not found`,
      );
      expect(contractService.findOne).toHaveBeenCalledWith(contractId);
    });
  });

  describe('POST /contracts', () => {
    it('success - should create a new contract', async () => {
      const newContractDto: ContractDto = {
        number: '54321',
        signDate: new Date(),
        clientId: 'client3',
        tenantId: 'tenant3',
      };

      const createdContract: Contract = {
        id: '3f84d82e-b5b3-4f47-b79b-5f8e9d3e4f7e',
        ...newContractDto,
      };

      jest
        .spyOn(contractService, 'create')
        .mockResolvedValue(createdContract);

      const response = await request(app.getHttpServer())
        .post('/contracts')
        .send({
          ...newContractDto,
          signDate: newContractDto.signDate.toISOString(),
        })
        .expect(201);

      expect(response.body).toEqual({
        ...createdContract,
        signDate: createdContract.signDate.toISOString(),
      });
      expect(contractService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...newContractDto,
          signDate: expect.any(Date),
        }),
      );
    });

    it('failure - validation error', async () => {
      const invalidContractDto = {
        signDate: new Date().toISOString(),
        clientId: 'client3',
        tenantId: 'tenant3',
      }; // Missing 'number' field

      const response = await request(app.getHttpServer())
        .post('/contracts')
        .send(invalidContractDto)
        .expect(400);

      expect(response.body.message).toContain('number should not be empty');
      expect(contractService.create).not.toHaveBeenCalled();
    });
  });

  describe('PUT /contracts/:id', () => {
    it('success - should update a contract', async () => {
      const contractId = existingContractId1;
      const updateContractDto: ContractDto = {
        number: 'updated-number',
        signDate: new Date(),
        clientId: 'client1',
        tenantId: 'tenant1',
      };

      const updatedContract: Contract = {
        id: contractId,
        ...updateContractDto,
      };

      jest
        .spyOn(contractService, 'update')
        .mockResolvedValue(updatedContract);

      const response = await request(app.getHttpServer())
        .put(`/contracts/${contractId}`)
        .send({
          ...updateContractDto,
          signDate: updateContractDto.signDate.toISOString(),
        })
        .expect(200);

      expect(response.body).toEqual({
        ...updatedContract,
        signDate: updatedContract.signDate.toISOString(),
      });
      expect(contractService.update).toHaveBeenCalledWith(
        contractId,
        expect.objectContaining({
          ...updateContractDto,
          signDate: expect.any(Date),
        }),
      );
    });

    it('failure - contract not found', async () => {
      const contractId = nonExistingContractId;
      const updateContractDto: ContractDto = {
        number: 'updated-number',
        signDate: new Date(),
        clientId: 'client1',
        tenantId: 'tenant1',
      };

      jest.spyOn(contractService, 'update').mockRejectedValue(
        new NotFoundException(`Contract with id ${contractId} not found`),
      );

      const response = await request(app.getHttpServer())
        .put(`/contracts/${contractId}`)
        .send({
          ...updateContractDto,
          signDate: updateContractDto.signDate.toISOString(),
        })
        .expect(404);

      expect(response.body.message).toEqual(
        `Contract with id ${contractId} not found`,
      );
      expect(contractService.update).toHaveBeenCalledWith(
        contractId,
        expect.objectContaining({
          ...updateContractDto,
          signDate: expect.any(Date),
        }),
      );
    });
  });

  describe('DELETE /contracts/:id', () => {
    it('success - should delete a contract', async () => {
      const contractId = existingContractId1;

      jest.spyOn(contractService, 'remove').mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete(`/contracts/${contractId}`)
        .expect(204);

      expect(contractService.remove).toHaveBeenCalledWith(contractId);
    });

    it('failure - contract not found', async () => {
      const contractId = nonExistingContractId;

      jest.spyOn(contractService, 'remove').mockRejectedValue(
        new NotFoundException(`Contract with id ${contractId} not found`),
      );

      const response = await request(app.getHttpServer())
        .delete(`/contracts/${contractId}`)
        .expect(404);

      expect(response.body.message).toEqual(
        `Contract with id ${contractId} not found`,
      );
      expect(contractService.remove).toHaveBeenCalledWith(contractId);
    });
  });
});
