import { Logger, BadRequestException } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { ContractData, ContractEvent } from '../dto/contract.event.dto';
import { ClientService } from '../service/client.service';

@Controller('/subscription')
export class SubscriptionController {
  private readonly logger = new Logger(SubscriptionController.name);

  constructor(private readonly clientService: ClientService) {}

  @Post('/contract')
  async handleContractAction(@Body() data: ContractEvent) {
    const base64Data = data.message.data;

    try {
      const contractData: ContractData = JSON.parse(atob(base64Data));
      await this.clientService.updateContractCount(contractData);
      this.logger.log(`Successfully processed contract action: ${contractData.action}, for clientId ${contractData.clientId} with tenantId ${contractData.clientId}`);
    } catch (error) {
      this.logger.error(`Error processing contract action: ${error}`);
      throw new BadRequestException('Failed to process contract action');
    }
  }
}