import { Repository } from 'typeorm';
import { ClientEntity } from '../entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientCreateDto } from '../dto/client.createDto';
import { ClientDto } from '../dto/client.dto';
import { plainToInstance } from 'class-transformer';
import { ClientMapper } from '../util/client.mapper';
import { PaginatedDto } from '../dto/paginated.dto';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from '../constants/constants';
import { Action, ContractData } from '../dto/contract.event.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(limit?: number, offset?: number): Promise<PaginatedDto<ClientDto>> {
    try {
      const [clients, total] = await this.clientRepository.findAndCount({
        skip: offset || DEFAULT_PAGINATION_OFFSET,
        take: limit || DEFAULT_PAGINATION_LIMIT,
        order: {
          id: 'DESC',
        },
      });
      const dtos = clients.map((client) => ClientMapper.toDto(client));
      return new PaginatedDto<ClientDto>(dtos, total, limit || DEFAULT_PAGINATION_LIMIT, offset || DEFAULT_PAGINATION_OFFSET);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch clients from the database: ${error.message}`, error,);
        throw new Error('Could not retrieve clients. Try again letter');
      }
      throw error
    }
  }

  async findById(id: number): Promise<ClientDto> {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });
      if (!client) {
        throw new NotFoundException(`Client with id ${id} not found`);
      }
      return ClientMapper.toDto(client);
    } catch (e) {
      if (e instanceof NotFoundException) {
        this.logger.warn(`Could not find client with id ${id}: ${e.message}`, e);
        throw e;
      }
      this.logger.error(`Error finding client with id ${id}: ${e instanceof Error ? e.message : e}`);
      throw new Error(`Unknown error occurred while finding client with id ${id}. Try again letter`);
    }
  }

  async create(
    createDto: ClientCreateDto,
    tenantId: string,
  ): Promise<ClientDto> {
    try {
      this.validateTenantId(tenantId);
      const newClient = plainToInstance(ClientEntity, createDto)
      newClient.tenantId = parseInt(tenantId);
      const savedClient = await this.clientRepository.save(newClient);
      return ClientMapper.toDto(savedClient);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error creating client: ${error.message}`, error);
      }
      throw new Error(`Unknown error occurred while creating client. Try again letter`);
    }
  }

  async update(
    createDto: ClientCreateDto,
    id: number,
    tenantId: string,
  ): Promise<ClientDto> {
    try {
      this.validateTenantId(tenantId);
      const client = await this.clientRepository.findOne({ where: { id } });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      client.name = createDto.name
      client.address = createDto.address
      client.tenantId = parseInt(tenantId)
      const updatedClient = await this.clientRepository.save(client);
      return ClientMapper.toDto(updatedClient);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(`Could not find client with id ${id}: ${error.message}`, error);
        throw error;
      }
      this.logger.error(`Error updating client with ID ${id}: ${error instanceof Error ? error.message : error}`);
      throw new Error(`Failed to update client with ID ${id}. Please try again later.`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.clientRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error deleting client with ID ${id}: ${error.message}`, error,);
      }
      throw new Error(`Unknown error occurred while deleting client with id ${id}. Try again letter`);
    }
  }

  async updateContractCount(
    data: ContractData,
  ): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id: data.clientId, tenantId: data.tenantId } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${data.clientId} and Tenant ID ${data.tenantId} not found`);
    }
    if (data.action === Action.CREATE) {
      client.contractCount = (client.contractCount || 0) + 1;
    }
    if (data.action === Action.DELETE) {
      client.contractCount = (client.contractCount || 0) - 1;
    }
    try {
      await this.clientRepository.save(client);
      this.logger.log(`Client contract count updated for client ID ${client.id}. New count: ${client.contractCount}`);
    } catch (error) {
      this.logger.error(`Failure contract count update for client ID ${ data.clientId }`, error);
      throw new Error(`Unknown error occurred while update client with id ${data.clientId}. Try again letter`);
    }
  }

  private validateTenantId(tenantId: string) {
    if (!/^\d+$/.test(tenantId)) {
      throw new BadRequestException('Invalid tenantId: it must be numeric.');
    }
  }
}
