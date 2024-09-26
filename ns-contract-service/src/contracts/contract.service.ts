import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contract } from "./contract.entity";
import { ContractDto } from "./dtos/contract.dto";
import { plainToInstance } from 'class-transformer';

@Injectable()
// TODO: Create a separate exception filter for handling exceptions from the contract repository when external services are involved.
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  // TODO: Implement exception filtering for external service errors in findAll()
  async findAll(): Promise<Contract[]> {
    try {
      return await this.contractRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve contracts');
    }
  }

  // TODO: Implement exception filtering for external service errors in findOne()
  async findOne(id: string): Promise<Contract> {
    try {
      const contract = await this.contractRepository.findOneBy({ id });
      if (!contract) {
        throw new NotFoundException(`Contract with id ${id} not found`);
      }
      return contract;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve contract');
    }
  }

  // TODO: Implement exception filtering for external service errors in create()
  async create(createContractDto: ContractDto): Promise<Contract> {
    try {
      const contract = plainToInstance(Contract, createContractDto);
      const newContract = this.contractRepository.create(contract);
      return await this.contractRepository.save(newContract);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create contract');
    }
  }

  // TODO: Implement exception filtering for external service errors in update()
  async update(id: string, updateContractDto: ContractDto): Promise<Contract> {
    try {
      const contract = await this.findOne(id);
      const updatedData = plainToInstance(Contract, updateContractDto);
      Object.assign(contract, updatedData);
      return await this.contractRepository.save(contract);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update contract');
    }
  }

  // TODO: Implement exception filtering for external service errors in remove()
  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.contractRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete contract');
    }
  }
}
