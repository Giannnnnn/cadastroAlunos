import "reflect-metadata"
import { DataSource } from "typeorm"
import { Agendamento } from "./entity/Agendamento"

export const SqlDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "agendamentos",
    synchronize: true,
    logging: false,
    entities: [Agendamento],
    migrations: [],
    subscribers: [],
})

