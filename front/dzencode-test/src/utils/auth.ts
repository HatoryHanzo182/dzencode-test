import { API_ENDPOINTS } from "@/api/endpoints";
import { httpClient } from "@/api/HttpClient";

interface ITokenResponse
{
    token: string;
}

async function GetToken()
{
    const data_t = await httpClient.post<ITokenResponse>(API_ENDPOINTS.AUTH.TOKEN);

    return data_t.token;
}

export async function EnsureToken()
{
    const TOKEN_KEY = "access_token";
    const token = localStorage.getItem(TOKEN_KEY);

    if (token)
        return;


    const newToken = await GetToken();

    localStorage.setItem(TOKEN_KEY, newToken);
}