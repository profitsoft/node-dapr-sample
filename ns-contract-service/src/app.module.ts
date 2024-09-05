import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from './modules/contract.module';
import { testDatabaseConfig } from './ormconfig.test';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? testDatabaseConfig
        : {
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'master',
            database: 'node-dapr-sample',
            autoLoadEntities: true,
            synchronize: true,
          },
    ),
    ContractModule,
  ],
})
export class AppModule {}
