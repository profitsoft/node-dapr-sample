import { Test, TestingModule } from "@nestjs/testing";
import { ContractService } from "./contract.service";
import { Contract } from "./contract.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { testDatabaseConfig } from "../ormconfig.test";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { GenericContainer } from "testcontainers";

describe("ContractService", () => {
  let service: ContractService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const postgresContainer = await new GenericContainer("postgres")
      .withEnvironment({
        POSTGRES_DB: process.env.DATABASE_NAME_TEST!,
        POSTGRES_USER: process.env.DATABASE_USER_TEST!,
        POSTGRES_PASSWORD: process.env.DATABASE_PASSWORD_TEST!,
      })
      .withExposedPorts(5432)
      .start();

    const host = postgresContainer.getHost();
    const port = postgresContainer.getMappedPort(5432);

    process.env.DATABASE_HOST_TEST = host;
    process.env.DATABASE_PORT_TEST = port.toString();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env.test",
        }),
        TypeOrmModule.forRoot(testDatabaseConfig),
        TypeOrmModule.forFeature([Contract]),
      ],
      providers: [ContractService],
    }).compile();

    service = module.get<ContractService>(ContractService);
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("findAll", () => {
    it("should return an empty array initially", async () => {
      const contracts = await service.findAll();
      expect(contracts).toEqual([]);
    });

    it("should return all contracts", async () => {
      const contract1 = await service.create({
        number: "12345",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      });
      const contract2 = await service.create({
        number: "67890",
        signDate: new Date(),
        clientId: "client2",
        tenantId: "tenant2",
      });

      const contracts = await service.findAll();

      expect(contracts).toHaveLength(2);
      expect(contracts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: contract1.id }),
          expect.objectContaining({ id: contract2.id }),
        ]),
      );
    });
  });

  describe("findOne", () => {
    it("should return the contract by ID", async () => {
      const contract = await service.create({
        number: "12345",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      });

      const foundContract = await service.findOne(contract.id);

      expect(foundContract).toEqual(contract);
    });

    it("should throw InternalServerErrorException if contract not found", async () => {
      await expect(service.findOne("non-existing-id")).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe("create", () => {
    it("should create and return a new contract", async () => {
      const createContractDto = {
        number: "12345",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      };

      const contract = await service.create(createContractDto);

      expect(contract).toHaveProperty("id");
      expect(contract.number).toEqual(createContractDto.number);
    });

    it("should throw InternalServerErrorException on error", async () => {
      await dataSource.destroy();

      await expect(
        service.create({
          number: "12345",
          signDate: new Date(),
          clientId: "client1",
          tenantId: "tenant1",
        }),
      ).rejects.toThrow(InternalServerErrorException);

      await dataSource.initialize();
    });
  });

  describe("update", () => {
    it("should update and return the updated contract", async () => {
      const contract = await service.create({
        number: "12345",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      });

      const updatedContract = await service.update(contract.id, {
        number: "54321",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      });

      expect(updatedContract.number).toEqual("54321");
    });

    it("should throw InternalServerErrorException if contract not found", async () => {
      await expect(
        service.update("non-existing-id", {
          number: "54321",
          signDate: new Date(),
          clientId: "client1",
          tenantId: "tenant1",
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe("remove", () => {
    it("should delete the contract", async () => {
      const contract = await service.create({
        number: "12345",
        signDate: new Date(),
        clientId: "client1",
        tenantId: "tenant1",
      });

      await service.remove(contract.id);

      await expect(service.findOne(contract.id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw InternalServerErrorException if contract not found", async () => {
      await expect(service.remove("non-existing-id")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
