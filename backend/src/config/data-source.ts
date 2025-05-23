import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

// ← ТУК импортни всички класове
import { Bus } from "../models/bus";
import { Stop } from "../models/Stop";
import { Route } from "../models/Route";
import { Schedule } from "../models/Schedule";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    // Явно подавай масив от класовете
    entities: [Bus, Stop, Route, Schedule],
    migrations: [],
    subscribers: [],
});
