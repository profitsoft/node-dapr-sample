import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract) {
      throw new Error(`Contract with id ${id} not found`);
    }
    return contract;
  }

  create(contract: Contract): Promise<Contract> {
    return this.contractRepository.save(contract);
  }

  async remove(id: string): Promise<void> {
    await this.contractRepository.delete(id);
  }
}
