import * as express from "express"
import { Request, Response } from "express"
import { SqlDataSource } from "./data-source"
import { Agendamento } from "./entity/Agendamento"

const app = express()
app.use(express.json())

const agendamentoReposity = SqlDataSource.getRepository(Agendamento)

app.get("/consultas", async function (req: Request, res: Response) {
    const consultas = await agendamentoReposity.find()
    res.json(consultas)
})

app.post("/consulta", async function (req: Request, res: Response) {
    const consulta = await agendamentoReposity.create(req.body)
    const results = await agendamentoReposity.save(consulta)
    return res.send(results)
})

app.listen(3000)