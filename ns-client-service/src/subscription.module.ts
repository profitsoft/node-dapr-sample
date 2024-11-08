import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from "./controller/subscription.controller";
import { ClientService } from './service/client.service';
import { ClientEntity } from './entity/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [SubscriptionController],
  providers: [ClientService],
})
export class SubscriptionModule {};