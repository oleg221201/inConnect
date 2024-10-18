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

export type AuthConfig = {
  accessSecret: string;
  accessExpires: string;

  refreshSecret: string;
  refreshExpires: string;

  masterKey: string;
};

export type AwsConfig = {
  region: string;
  bucketName: string;
};
