import { registerAs } from '@nestjs/config';
import { AUTH_CONFIG } from '../common/constants/config.constant';
import { AuthConfig } from './types';

export { AuthConfig };

export const authConfig = registerAs(AUTH_CONFIG, (): AuthConfig => {
  const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES,

    JWT_REFRESH_EXPIRES,
    JWT_REFRESH_SECRET,
  } = process.env;

  return {
    accessSecret: JWT_ACCESS_SECRET || 'accessSecret',
    accessExpires: JWT_ACCESS_EXPIRES || '1h',

    refreshSecret: JWT_REFRESH_SECRET || 'refreshSecret',
    refreshExpires: JWT_REFRESH_EXPIRES || '7d',
  };
});
