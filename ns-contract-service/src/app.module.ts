import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from './contracts/contract.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = process.env.NODE_ENV === 'test';
        return {
          type: 'postgres',
          host: configService.get<string>(isTestEnv ? 'DATABASE_HOST_TEST' : 'DATABASE_HOST'),
          port: configService.get<number>(isTestEnv ? 'DATABASE_PORT_TEST' : 'DATABASE_PORT'),
          username: configService.get<string>(isTestEnv ? 'DATABASE_USER_TEST' : 'DATABASE_USER'),
          password: configService.get<string>(isTestEnv ? 'DATABASE_PASSWORD_TEST' : 'DATABASE_PASSWORD'),
          database: configService.get<string>(isTestEnv ? 'DATABASE_NAME_TEST' : 'DATABASE_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          dropSchema: isTestEnv,
        };
      },
    }),
    ContractModule,
  ],
})
export class AppModule {}
