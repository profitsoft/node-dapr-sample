import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
}

export default config;