import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '../../.env') });

export const requireEnv = (name: string): string => {
  const env = process.env[name];
  if (!env) throw new Error(`Missing required env "${name}"`);
  return env;
};
