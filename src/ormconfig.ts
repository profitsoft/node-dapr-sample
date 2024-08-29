import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'node-dapr-sample',
    synchronize: false,
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
}

export default config;