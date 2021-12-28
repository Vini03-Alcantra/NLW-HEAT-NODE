import "dotenv/config"
import express, { Request, Response } from "express";

import { router } from "./routes";

const github_id = process.env.GITHUB_CLIENT_ID
const PORT = 4000;
const app = express()

app.use(express.json())
app.use(router)

app.get("/github", (request: Request, response: Response) => {    
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${github_id}`)
})

app.get("/signin/callback", (req: Request, res: Response) => {    
    const {code} = req.query;
    return res.json(code)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))