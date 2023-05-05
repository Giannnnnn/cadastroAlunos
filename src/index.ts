import cors = require("cors")
import { SqlDataSource } from "./data-source"
import { Agendamento } from "./entity/Agendamento"

import * as express from "express"
import { Request, Response } from "express"

const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {};

SqlDataSource.initialize().then(async () => {
    const app = express()
    app.use(cors(options))
    app.use(express.json())

    const agendamentoReposity = SqlDataSource.getRepository(Agendamento)

    console.log(`Running on port 3000`)

    app.get("/consultas", async function (req: Request, res: Response) {
        const agendamentos = await agendamentoReposity.find()
        res.json({
            consultas: {
                agendamentos
            },
            total: agendamentos.length
        })
    })

    app.post("/consulta", async function (req: Request, res: Response) {
        const agendamento = await agendamentoReposity.create(req.body)

        try {
            await agendamentoReposity.save(agendamento).then((result) => {
                if (result) {
                    return res.send(result)
                } else {
                    return res.status(404).send("Erro ao cadastrar agendamento de consulta" + req.body.name)
                }
            })
        } catch (error) {
            return res.status(404).send(error)
        }
    })

    app.listen(3000)

}).catch(error => console.log(error))

// create and setup express app
