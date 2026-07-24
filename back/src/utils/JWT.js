import jwt from "jsonwebtoken";

const JWT_SECRET = "super-secret-key";

export function GenerateToken()
{
    return jwt.sign(
        {
            type: "guest"
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
}

export function VerifyToken(token)
{
    return jwt.verify(token, JWT_SECRET);
}