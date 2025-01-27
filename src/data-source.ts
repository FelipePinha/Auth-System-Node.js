import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { User } from './entities/User'

dotenv.config()

const dbPort = parseInt(process.env.DB_PORT!)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: dbPort,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    synchronize: false,
    entities: [User],
    migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
})