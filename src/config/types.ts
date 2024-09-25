import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export type AppConfig = {
  nodeEnv: string;
  port: number;
  testMode: boolean;
  cors: CorsOptions;
};

export type DBConfig = {
  url: string;
  dbName: string;
};
