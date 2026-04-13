import { config } from "./config";
import { tokenStorage } from "./token";

// Helper function to make API calls
interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    auth?: boolean; // Whether to include the auth token
}

export class ApiError extends Error {
    constructor(public status: number, public details: unknown) {
        super(`API Error: ${status}`);
    }
}

export async function api<T = unknown>(
    path: string,
    Options: ApiOptions = {}
): Promise<T> {
    const { method = "GET", body, auth = true } = Options;
    const headers: Record<string, string> = {}
    if (body != undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (auth) {
        const token = tokenStorage.get();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    const res = await fetch(`${config.apiBaseUrl}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new ApiError(res.status, errorData);
    }

    return res.json();
}