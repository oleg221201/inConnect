import { registerAs } from '@nestjs/config';
import { DB_CONFIG } from '../common/constants/config.constant';
import { DBConfig } from './types';
import { requireEnv } from '~utils/env.utils';

export { DBConfig };

export const dbConfig = registerAs(DB_CONFIG, (): DBConfig => {
  return {
    url: requireEnv('DB_URL'),
    dbName: requireEnv('DB_NAME'),
  };
});
