import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenvConfig } from "dotenv";
import { Contract } from "./contracts/contract.entity";

dotenvConfig({ path: ".env.test" });

export const testDatabaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST_TEST!,
  port: parseInt(process.env.DATABASE_PORT_TEST!, 10),
  username: process.env.DATABASE_USER_TEST!,
  password: process.env.DATABASE_PASSWORD_TEST!,
  database: process.env.DATABASE_NAME_TEST!,
  entities: [Contract],
  dropSchema: true,
  synchronize: true,
  autoLoadEntities: true,
};
