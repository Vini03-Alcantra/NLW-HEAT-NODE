import axios from "axios"
import "dotenv/config"
import { sign } from "jsonwebtoken";


import prismaClient from "../prisma"
interface IAccessTokenResponse{
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {    
    async execute(code: string){
        const JWT_SECRET = process.env.JWT_SECRET;
        const url = "https://github.com/login/oauth/access_token";

        const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>(
            "https://api.github.com/user", 
            {
                headers: {
                    authorization: `Bearer ${accessTokenResponse.access_token}`
                }
            }
        )

        const {login, id, avatar_url, name} = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user){
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avat_url: avatar_url,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avat_url,
                    id: user.id
                },
            },
            JWT_SECRET ? JWT_SECRET : "",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return  {token, user};

    }    
}

export {AuthenticateUserService}