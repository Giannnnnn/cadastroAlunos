import cors = require("cors")
import { SqlDataSource } from "./data-source"
import { User } from "./entity/User"

import * as express from "express"
import { Request, Response } from "express"

const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {};

SqlDataSource.initialize().then(async () => {
    const app = express()
    app.use(cors(options))
    app.use(express.json())

    const userRepo = SqlDataSource.getRepository(User)

    console.log(`Running on port 3000`)

    app.get("/users", async function (req: Request, res: Response) {
        const users = await userRepo.find()
        res.json({
            users,
            total: users.length
        })
    })

    app.get("/users/alunos", async function (req: Request, res: Response) {
        const users = await userRepo.find({
            where: {
                type: "aluno"
            }
        })
        res.json({
            users,
            total: users.length
        })
    })

    app.get("/users/professores", async function (req: Request, res: Response) {
        const users = await userRepo.find({
            where: {
                type: "professor"
            }
        })
        res.json({
            users,
            total: users.length
        })
    })

    app.post("/users/aluno", async function (req: Request, res: Response) {
        console.log(req.body)

        const user = await userRepo.create(req.body)
        try {
            await userRepo.save(user).then((result) => {
                if (result) {
                    return res.send(result)
                } else {
                    return res.status(404).send("Erro ao cadastrar aluno" + req.body.name)
                }
            })
        } catch (error) {
            return res.status(404).send(error)
        }
    })

    app.post("/users/professor", async function (req: Request, res: Response) {
        console.log(req.body)

        const user = await userRepo.create(req.body)
        try {
            await userRepo.save(user).then((result) => {
                if (result) {
                    return res.send(result)
                } else {
                    return res.status(404).send("Erro ao cadastrar professor" + req.body.name)
                }
            })
        } catch (error) {
            return res.status(404).send(error)
        }
    })

    app.delete("/users/aluno/:id", async function (req: Request, res: Response) {
        const results = await userRepo.delete(req.params.id)
        return res.send(results)
    })

    app.delete("/users/aluno/:id", async function (req: Request, res: Response) {
        const results = await userRepo.delete(req.params.id)
        return res.send(results)
    })

    app.listen(3000)

}).catch(error => console.log(error))

// create and setup express app
