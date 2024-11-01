import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractModule } from "./contracts/contract.module";
import { DaprModule } from './dapr/dapr.module';
import { Contract } from "./contracts/contract.entity";
import { ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { OpenTelemetryModule } from 'nestjs-otel';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // TODO: Configure all env in src/config/config.ts when Google Cloud Datastore will be available.
      envFilePath: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    }),
    OpenTelemetryModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = process.env.NODE_ENV === "test";
        const isDevEnv = process.env.NODE_ENV === "development";
        return {
          type: "postgres",
          host: configService.get<string>(
            isTestEnv ? "DATABASE_HOST_TEST" : "DATABASE_HOST",
          ),
          port: configService.get<number>(
            isTestEnv ? "DATABASE_PORT_TEST" : "DATABASE_PORT",
          ),
          username: configService.get<string>(
            isTestEnv ? "DATABASE_USER_TEST" : "DATABASE_USER",
          ),
          password: configService.get<string>(
            isTestEnv ? "DATABASE_PASSWORD_TEST" : "DATABASE_PASSWORD",
          ),
          database: configService.get<string>(
            isTestEnv ? "DATABASE_NAME_TEST" : "DATABASE_NAME",
          ),
          autoLoadEntities: isDevEnv || isTestEnv,
          entities: !isDevEnv && !isTestEnv ? [Contract] : [],
          synchronize: isDevEnv || isTestEnv,
          dropSchema: isTestEnv,
        };
      },
    }),
    ContractModule,
    DaprModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
