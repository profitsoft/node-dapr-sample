import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ContractService } from "./contract.service";
import { Contract } from "./contract.entity";
import { ContractDto } from "./dtos/contract.dto";
import { plainToInstance } from "class-transformer";

@Controller("contracts")
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ContractDto[]> {
    const contracts = await this.contractService.findAll();
    return plainToInstance(ContractDto, contracts);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param("id", new ParseUUIDPipe()) id: string,
  ): Promise<ContractDto> {
    const contract = await this.contractService.findOne(id);
    return plainToInstance(ContractDto, contract);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContractDto: ContractDto): Promise<ContractDto> {
    const contract = await this.contractService.create(createContractDto);
    return plainToInstance(ContractDto, contract);
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateContractDto: ContractDto,
  ): Promise<ContractDto> {
    const contract = await this.contractService.update(id, updateContractDto);
    return plainToInstance(ContractDto, contract);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", new ParseUUIDPipe()) id: string): Promise<void> {
    await this.contractService.remove(id);
  }
}
