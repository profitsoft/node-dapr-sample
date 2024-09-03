import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { Contract } from '../entities/contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Post()
  create(@Body() contract: Contract): Promise<Contract> {
    return this.contractService.create(contract);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contractService.remove(id);
  }
}
