import fs from 'fs';
import path from 'path';
import z from 'zod';
import { config } from 'dotenv';

config({
  path: path.resolve(__dirname, '../../.env'),
});

const checkEnv = async () => {
  const chalk = (await import('chalk')).default;
  if (!fs.existsSync(path.resolve('.env'))) {
    console.log(chalk.red('Environment file .env not found'));
    process.exit(1);
  }
};
checkEnv();

const configSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  SESSION_TOKEN_SECRET: z.string(),
  SESSION_TOKEN_EXPIRES_IN: z.string(),
  DOMAIN: z.string(),
  PROTOCOL: z.string(),
  UPLOAD_FOLDER: z.string(),
  COOKIE_MODE: z.enum(['true', 'false']).transform((val) => val === 'true'),
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.error(configServer.error.issues);
  throw new Error('The declared values ​​in the .env file are invalid.');
}

const envConfig = configServer.data;

export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`;
export default envConfig;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof configSchema> {}
  }
}