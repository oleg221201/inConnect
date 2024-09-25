import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export type AppConfig = {
  port: number;
  testMode: boolean;
  cors: CorsOptions;
};

export type DBConfig = {
  url: string;
  dbName: string;
};
