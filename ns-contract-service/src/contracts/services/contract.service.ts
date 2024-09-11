import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../entities/contract.entity';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { UpdateContractDto } from '../dtos/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find();
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract) {
      throw new NotFoundException(`Contract with id ${id} not found`);
    }
    return contract;
  }

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = this.contractRepository.create(createContractDto);
    return await this.contractRepository.save(contract);
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);
    Object.assign(contract, updateContractDto);
    return await this.contractRepository.save(contract);
  }

  async remove(id: string): Promise<void> {
    const contract = await this.findOne(id);
    if (!contract || !contract.id) {
      throw new NotFoundException(`Contract with id ${id} not found`);
    }
    await this.contractRepository.delete(contract.id);
  }  
}
