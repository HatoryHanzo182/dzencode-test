import { GenerateToken } from "../utils/JWT.js";

export function CreateGuestToken()
{
    return GenerateToken();
}