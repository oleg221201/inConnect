import { registerAs } from '@nestjs/config';
import { DB_CONFIG } from './constants';
import { DBConfig } from './types';

export { DBConfig };

export const dbConfig = registerAs(DB_CONFIG, (): DBConfig => {
  const { DB_URL, DB_NAME } = process.env;

  return {
    url: DB_URL,
    dbName: DB_NAME,
  };
});
