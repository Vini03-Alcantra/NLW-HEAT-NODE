import "dotenv/config"
import express, { Request, Response } from "express";
import http from "http"
import { Server } from "socket.io";
import cors from "cors"

import { router } from "./routes";

const github_id = process.env.GITHUB_CLIENT_ID
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.get("/github", (request: Request, response: Response) => {    
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${github_id}`)
})

app.get("/signin/callback", (req: Request, res: Response) => {    
    const {code} = req.query;
    return res.json(code)
})

export {serverHttp, io}