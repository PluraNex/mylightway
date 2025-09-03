interface Environment {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_ENV: string;
  ENABLE_DEVTOOLS: boolean;
  ENABLE_API_MOCKING: boolean;
  TOKEN_STORAGE_KEY: string;
  REFRESH_TOKEN_STORAGE_KEY: string;
}

function getEnvVar(key: string, fallback?: string): string {
  const value = import.meta.env[key] || fallback;
  if (!value) {
    console.warn(`Environment variable ${key} is not defined`);
  }
  return value || '';
}

function getBooleanEnvVar(key: string, fallback = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value === 'true' || value === '1';
}

function getNumberEnvVar(key: string, fallback: number): number {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

export const env: Environment = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api'),
  API_TIMEOUT: getNumberEnvVar('VITE_API_TIMEOUT', 10000),
  APP_ENV: getEnvVar('VITE_APP_ENV', 'development'),
  ENABLE_DEVTOOLS: getBooleanEnvVar('VITE_ENABLE_DEVTOOLS', true),
  ENABLE_API_MOCKING: getBooleanEnvVar('VITE_ENABLE_API_MOCKING', false),
  TOKEN_STORAGE_KEY: getEnvVar('VITE_TOKEN_STORAGE_KEY', 'auth_token'),
  REFRESH_TOKEN_STORAGE_KEY: getEnvVar('VITE_REFRESH_TOKEN_STORAGE_KEY', 'refresh_token'),
};

export const isDevelopment = env.APP_ENV === 'development';
export const isProduction = env.APP_ENV === 'production';
export const isTest = env.APP_ENV === 'test';