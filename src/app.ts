import * as express from "express"
import { Request, Response } from "express"
import { SqlDataSource } from "./data-source"
import { User } from "./entity/User"
// create and setup express app
const app = express()
app.use(express.json())

// register routes
const userRepo = SqlDataSource.getRepository(User)

app.get("/users", async function (req: Request, res: Response) {
    const users = await userRepo.find()
    res.json(users)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await userRepo.create(req.body)
    const results = await userRepo.save(user)
    return res.send(results)
})


app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await userRepo.delete(req.params.id)
    return res.send(results)
})

app.listen(3000)