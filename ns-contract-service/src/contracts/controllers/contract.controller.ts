import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { Contract } from '../entities/contract.entity';
import { CreateContractDto, UpdateContractDto } from '../dtos/contract.dto';
import { plainToInstance } from 'class-transformer';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    const contract = plainToInstance(Contract, createContractDto);
    return this.contractService.create(contract);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = plainToInstance(Contract, updateContractDto);
    return this.contractService.update(id, contract);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.contractService.remove(id);
  }
}
