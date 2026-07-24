const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

class HttpClient
{
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T>
    {
        const token = localStorage.getItem(TOKEN_KEY);

        const response = await fetch(`${API_URL}${endpoint}`,
            {
                ...options,
                headers:
                {
                    "Content-Type": "application/json",
                    ...options?.headers,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            }
        );

        if (!response.ok)
            throw new Error(`HTTP Error: ${response.status}`);

        return response.json();
    }

    public get<T>(endpoint: string): Promise<T>
    {
        return this.request<T>(
            endpoint,
            {
                method: "GET",
            }
        );
    }

    public post<T>(endpoint: string, body?: unknown): Promise<T>
    {
        return this.request<T>(
            endpoint,
            {
                method: "POST",
                body: body ? JSON.stringify(body) : undefined,
            }
        );
    }

    public put<T>(endpoint: string, body?: unknown): Promise<T>
    {
        return this.request<T>(
            endpoint,
            {
                method: "PUT",
                body: body ? JSON.stringify(body) : undefined,
            }
        );
    }

    public delete<T>(endpoint: string): Promise<T>
    {
        return this.request<T>(
            endpoint,
            {
                method: "DELETE",
            }
        );
    }
}

export const httpClient = new HttpClient();