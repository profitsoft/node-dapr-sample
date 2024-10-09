import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contract } from "./contract.entity";
import { ContractDto } from "./dtos/contract.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
// TODO: Create a separate exception filter for handling exceptions from the contract repository when external services are involved.
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  // TODO: Implement exception filtering for external service errors in findAll()
  async findAll(): Promise<Contract[]> {
    try {
      this.logger.log('Retrieving all contracts');
      return await this.contractRepository.find();
    } catch (error) {
      this.logger.error('Failed to retrieve contracts', (error as Error).stack);
      throw new InternalServerErrorException('Failed to retrieve contracts');
    }
  }

  // TODO: Implement exception filtering for external service errors in findOne()
  async findOne(id: string): Promise<Contract> {
    try {
      this.logger.log(`Retrieving contract with id ${id}`);
      const contract = await this.contractRepository.findOneBy({ id });
      if (!contract) {
        this.logger.warn(`Contract with id ${id} not found`);
        throw new NotFoundException(`Contract with id ${id} not found`);
      }
      return contract;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
        throw error;
      }
      this.logger.error(`Failed to retrieve contract with id ${id}`, (error as Error).stack);
      throw new InternalServerErrorException('Failed to retrieve contract');
    }
  }

  // TODO: Implement exception filtering for external service errors in create()
  async create(createContractDto: ContractDto): Promise<Contract> {
    try {
      this.logger.log('Creating a new contract');
      const contract = plainToInstance(Contract, createContractDto);
      const newContract = this.contractRepository.create(contract);
      const savedContract = await this.contractRepository.save(newContract);
      this.logger.log(`Contract created with id ${savedContract.id}`);
      return savedContract;
    } catch (error) {
      this.logger.error('Failed to create contract', (error as Error).stack);
      throw new InternalServerErrorException('Failed to create contract');
    }
  }

  // TODO: Implement exception filtering for external service errors in update()
  async update(id: string, updateContractDto: ContractDto): Promise<Contract> {
    try {
      this.logger.log(`Updating contract with id ${id}`);
      const contract = await this.findOne(id);
      const updatedData = plainToInstance(Contract, updateContractDto);
      Object.assign(contract, updatedData);
      this.logger.log(`Contract with id ${id} updated`);
      return await this.contractRepository.save(contract);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error.message);
        throw error;
      } else {
        this.logger.error(`Failed to update contract with id ${id}`, (error as Error).stack);
        throw new InternalServerErrorException('Failed to update contract');
      }
    }
  }

  // TODO: Implement exception filtering for external service errors in remove()
  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`Deleting contract with id ${id}`);
      await this.findOne(id);
      await this.contractRepository.delete(id);
      this.logger.log(`Contract with id ${id} deleted`);
    } catch (error) {
      this.logger.error(`Failed to delete contract with id ${id}`, (error as Error).stack);
      throw new NotFoundException('Failed to delete contract');
    }
  }
}
