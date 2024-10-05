import { Repository } from "typeorm";
import { ClientEntity } from "../entity/client.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ClientCreateDto } from "../dto/client.createDto";
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class ClientService {

  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientDto[]> {
    try {
      const clients = await this.clientRepository.find();  // DB request
      return clients.map(client => this.toDto(client));
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch clients from the database: ${error.message}`, error);
      }
      throw new Error('Could not retrieve clients. Try again letter');
    }
  }

  async findById(id: number): Promise<ClientDto> {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });
      if (!client) {
        throw new NotFoundException(`Client with id ${id} not found`);
      }
      return this.toDto(client);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`Error finding client with id ${id}: ${e.message}`, e);
      }
      throw e;
    }
  }

  async create(createDto: ClientCreateDto, tenantId: string): Promise<ClientDto> {
    try {
      this.validateTenantId(tenantId);
      const newClient = this.fromCreateDto(createDto);
      newClient.tenantId = parseInt(tenantId);
      const savedClient = await this.clientRepository.save(newClient);
      return this.toDto(savedClient);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error creating client: ${error.message}`, error);
      }
      throw error;
    }
  }

  async update(createDto: ClientCreateDto, id: number, tenantId: string): Promise<ClientDto> {
    try {
      this.validateTenantId(tenantId);
      const client = await this.clientRepository.findOne({ where: { id } });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      Object.assign(client, {
        ...createDto,
        tenantId: parseInt(tenantId)
      });
      const updatedClient = await this.clientRepository.save(client);
      return this.toDto(updatedClient);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error updating client with ID ${id}: ${error.message}`, error);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.clientRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error deleting client with ID ${id}: ${error.message}`, error);
      }
      throw error;
    }
  }

  async deleteAll(): Promise<void> {
    await this.clientRepository.delete({});
  }

  private toDto(client: ClientEntity): ClientDto {
    return new ClientDto(
      client.id!,
      client.tenantId,
      client.name,
      client.address,
    )
  }

  private fromCreateDto(createDto: ClientCreateDto): ClientEntity {
    const clientEntity = new ClientEntity()
    clientEntity.address = createDto.address
    clientEntity.name = createDto.name
    return clientEntity
  }

  private validateTenantId(tenantId: string) {
    if (!/^\d+$/.test(tenantId)) {
      throw new BadRequestException('Invalid tenantId: it must be numeric.');
    }
  }

}