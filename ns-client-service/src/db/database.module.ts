import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {DatabaseConfig, dbConfig} from "./database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [dbConfig],
          envFilePath: process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        ...configService.get<DatabaseConfig>("database"),
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
        migrations: [__dirname + '/../migrations/*.{ts,js}'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}