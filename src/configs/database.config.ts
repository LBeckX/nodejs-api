import {DataSource} from "typeorm";
import './dotenv.config.js'
import Entities from '../entities/index.js';

export const databaseConfig = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    synchronize: true,
    logging: true,
    entities: Entities,
    subscribers: [],
    migrations: [],
})
