import { Repository } from "typeorm";
import { ClientEntity } from "./client.entity";
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientCreateDto } from "./dto/client.createDto";

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async findById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`)
    }
    return client
  }

  async create(createDto: ClientCreateDto, tenantId: number): Promise<ClientEntity> {
    return await this.clientRepository.save({
      ...createDto,
      tenantId
    });
  }

  async update(createDto: ClientCreateDto, id: number, tenantId: number): Promise<ClientEntity> {

    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    Object.assign(client, {
      ...createDto,
      tenantId
    });

    return await this.clientRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id)
    if (result.affected == 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }

  async deleteAll(): Promise<void> {
    await this.clientRepository.delete({})
  }

}