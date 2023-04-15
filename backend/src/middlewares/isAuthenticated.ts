import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {

    // Receber token
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    // Pegar token
    const [, token] = authToken.split(" ");

    try{
        // Validar token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        // Recuperar ID do token e colocar dentro de uma variável no Request (req)
        req.user_id = sub;

        return next();

    } catch(err) {
        return res.status(401).end();
    }

}