import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractService } from "./services/contract.service";
import { ContractController } from "./controllers/contract.controller";
import { Contract } from "./entities/contract.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
