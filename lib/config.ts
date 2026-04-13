const requiredEnv = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const config = {
  apiBaseUrl: requiredEnv('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL),
};