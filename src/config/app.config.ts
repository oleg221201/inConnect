import { registerAs } from '@nestjs/config';
import { AppConfig } from './types';
import { APP_CONFIG } from './constants';

export { AppConfig };

export const appConfig = registerAs(APP_CONFIG, (): AppConfig => {
  const { PORT, TEST_MODE, NODE_ENV, CORS_CREDENTIALS, CORS_URL } = process.env;
  return {
    nodeEnv: NODE_ENV || 'develop',
    port: Number(PORT) || 3000,
    testMode: TEST_MODE === 'true',
    cors: {
      origin:
        NODE_ENV === 'production'
          ? CORS_URL
          : (_origin: any, callback: any) => callback(null, true),
      optionsSuccessStatus: 200,
      credentials: CORS_CREDENTIALS ? Boolean(CORS_CREDENTIALS) : true,
    },
  };
});
