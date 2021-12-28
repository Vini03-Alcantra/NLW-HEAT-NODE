import "dotenv/config"
import { Request, Response } from "express";

const github_id = process.env.GITHUB_CLIENT_ID


const PORT = 4000;
import express from "express"

const app = express()


app.get("/github", (request: Request, response: Response) => {
    console.log(github_id)
    console.log("Chegou aqui")
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${github_id}`)
})

app.get("/signin/callback", (req: Request, res: Response) => {
    console.log("chegou aqui 2")
    const {code} = req.query;
    return res.json(code)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))