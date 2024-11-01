import { Injectable, Logger } from '@nestjs/common';
import { CommunicationProtocolEnum, DaprClient } from 'dapr-client';
import { ContractEvent } from './dtos/contract.event.dto';
import { Contract } from '../contracts/contract.entity';
import { Action } from './dtos/contract.event.dto';

@Injectable()
export class DaprService {
  private readonly daprClient: DaprClient;
  private readonly logger;

  private readonly CONTRACT_TOPIC: string = process.env.CONTRACT_TOPIC || 'contract-actions';
  private readonly PUBSUB_NAME: string = process.env.PUBSUB_NAME ||'pubsub';
  private readonly MAX_RETRIES: number = Number(process.env.MAX_RETRIES) || 5;
  private readonly DELAY: number = Number(process.env.DELAY) || 1000;
  private readonly DAPR_HOST: string = process.env.DAPR_HTTP_HOST || 'localhost';
  private readonly DAPR_PORT: string = process.env.DAPR_HTTP_PORT || '3500';

    constructor() {
      this.daprClient = new DaprClient({
        daprHost: this.DAPR_HOST,
        daprPort: this.DAPR_PORT,
        communicationProtocol: CommunicationProtocolEnum.HTTP,
        isKeepAlive: true,
      });
      this.logger = new Logger(DaprService.name);
  }

  async publishContractEvent(contract: Contract, action: Action) {
    const eventDto: ContractEvent = {
      action: action,
      clientId: contract.clientId,
      tenantId: contract.tenantId,
    }
    for (let attempts = 0; attempts < this.MAX_RETRIES; attempts++) {
      try {
        await this.daprClient.pubsub.publish(
          this.PUBSUB_NAME,
          this.CONTRACT_TOPIC,
          eventDto,
        );
        this.logger.log(`Successfully published ${action} contract message.`, eventDto);
        return;
      } catch (error) {
        this.logger.error(`Failed to publish ${ action } contract message. Attempt ${attempts + 1} of ${this.MAX_RETRIES}`, error);
        if (attempts === this.MAX_RETRIES - 1) {
          throw new Error(`Failed to publish message: ${JSON.stringify(eventDto)}, after ${this.MAX_RETRIES} attempts`);
        }
        await this.delay(this.DELAY);
      }
    }
  }

  private delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
}