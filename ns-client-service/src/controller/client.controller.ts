import { ClientService } from "../service/client.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientCreateDto } from "../dto/client.createDto";
import { ClientDto } from '../dto/client.dto';


@Controller('/api/clients')
export class ClientController {

  constructor(
    private readonly clientService: ClientService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ClientDto[]> {
    return await this.clientService.findAll()
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number): Promise<ClientDto> {
    return await this.clientService.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: ClientCreateDto, @Headers('tenantId') tenantId: string): Promise<ClientDto> {
    return await this.clientService.create(createDto, tenantId)
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() createDto: ClientCreateDto, @Headers('tenantId') tenantId: string, @Param('id') id: number): Promise<ClientDto> {
    return await this.clientService.update(createDto, id, tenantId)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClient(@Param('id') id: number): Promise<void> {
    await this.clientService.delete(id);
  }

}