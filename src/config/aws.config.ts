import { requireEnv } from '~utils/env.utils';
import { AwsConfig } from './types';

export const awsConfig = (): AwsConfig => {
  return {
    region: requireEnv('AWS_REGION'),
    bucketName: requireEnv('AWS_BUCKET_NAME'),
  };
};
