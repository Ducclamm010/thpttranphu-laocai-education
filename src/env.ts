const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  NEXT_PUBLIC_SUPABASE_URL: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  SUPABASE_SERVICE_ROLE_KEY: getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  SUPABASE_JWKS_URL: getEnv('SUPABASE_JWKS_URL'),

  GOOGLE_CLIENT_ID: getEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getEnv('GOOGLE_CLIENT_SECRET'),
  GOOGLE_DRIVE_MAIL: getEnv('GOOGLE_DRIVE_MAIL'),
  GOOGLE_DRIVE_PRIVATE_KEY: getEnv('GOOGLE_DRIVE_PRIVATE_KEY'),
  GOOGLE_DRIVE_FOLDER_ID: getEnv('GOOGLE_DRIVE_FOLDER_ID'),
  
  APP_GEMINI_KEY: getEnv('APP_GEMINI_KEY'),
  APP_CHATGPT_KEY: getEnv('APP_CHATGPT_KEY'),
  APP_OPENROUTE_KEY: getEnv('APP_OPENROUTE_KEY'),
  APP_GROQ_KEY: getEnv('APP_GROQ_KEY'),

  TEACHER_VERIFICATION_CODE: getEnv('TEACHER_VERIFICATION_CODE'),
};