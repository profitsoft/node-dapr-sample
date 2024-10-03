import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
  ],
})

export class AppModule {}