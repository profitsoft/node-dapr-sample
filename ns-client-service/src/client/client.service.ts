import { Repository } from "typeorm";
import { ClientEntity } from "./client.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientCreateDto } from "./dto/client.createDto";
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientDto[]> {
    const clients = await this.clientRepository.find();
    return clients.map(client => this.toDto(client));
  }

  async findById(id: number): Promise<ClientDto> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`)
    }
    return this.toDto(client)
  }

  async create(createDto: ClientCreateDto, tenantId: number): Promise<ClientDto> {
    const newClient = this.fromCreateDto(createDto);
    newClient.tenantId = tenantId;
    return this.toDto(await this.clientRepository.save(newClient))
  }

  async update(createDto: ClientCreateDto, id: number, tenantId: number): Promise<ClientDto> {

    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    Object.assign(client, {
      ...createDto,
      tenantId
    });

    return this.toDto(await this.clientRepository.save(client));
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id)
  }

  async deleteAll(): Promise<void> {
    await this.clientRepository.delete({})
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

}