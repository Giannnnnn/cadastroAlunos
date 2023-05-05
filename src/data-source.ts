import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const SqlDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "teste",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

