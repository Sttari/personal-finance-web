const TOKEN_KEY = "finance_token";

export const tokenStorage = {
    get(): string | null {
        if (typeof window === "undefined") return null; // Server-side rendering check
        return localStorage.getItem(TOKEN_KEY);
    },
    set(token: string): void {
        if (typeof window === "undefined") return; // Server-side rendering check
        localStorage.setItem(TOKEN_KEY, token);
    },
    clear(): void {
        if (typeof window === "undefined") return; // Server-side rendering check
        localStorage.removeItem(TOKEN_KEY);
    },
};