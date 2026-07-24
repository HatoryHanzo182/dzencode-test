import { VerifyToken } from "../utils/JWT.js";

export function AuthMiddleware(req, res, next)
{
    const authorization = req.headers.authorization;
    const [type, token] = authorization.split(" ");

    try
    {
        const decoded = VerifyToken(token);

        req.user = decoded;

        next();
    }
    catch (error)
    {
        return res.status(401).json({message: "Invalid or expired token" });
    }
}