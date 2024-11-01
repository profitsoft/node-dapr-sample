import { Module } from '@nestjs/common';
import { ClientModule } from './client.module';
import { SubscriptionModule } from './subscription.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule, ClientModule, SubscriptionModule],
})
export class AppModule {}
