import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from './modules/contract.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'master',
      database: 'node-dapr-sample',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ContractModule,
  ],
})
export class AppModule {}
