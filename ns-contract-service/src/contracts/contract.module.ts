import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { Contract } from "./contract.entity";
import { DaprService } from '../dapr/dapr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractService, DaprService],
  controllers: [ContractController],
})
export class ContractModule {}
