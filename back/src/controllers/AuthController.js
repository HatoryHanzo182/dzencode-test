import { CreateGuestToken } from "../services/AuthService.js";

export function GetGuestToken(req, res)
{
    const token = CreateGuestToken();

    res.json({ token });
}