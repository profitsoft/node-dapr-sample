import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ContractService } from '../services/contract.service';
import { Contract } from '../entities/contract.entity';
import { CreateContractDto } from '../dtos/create-contract.dto';
import { UpdateContractDto } from '../dtos/update-contract.dto';
import { plainToInstance } from 'class-transformer';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Contract[]> {
    return await this.contractService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Contract> {
    return await this.contractService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    const contract = plainToInstance(Contract, createContractDto);
    return await this.contractService.create(contract);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = plainToInstance(Contract, updateContractDto);
    return await this.contractService.update(id, contract);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.contractService.remove(id);
  }
}
