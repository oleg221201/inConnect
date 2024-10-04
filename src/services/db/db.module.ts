import { Logger, Module } from '@nestjs/common';
import {
  dbConnectionProvider,
  dbProviderNames,
  dbProviders,
} from './db.constants';
import { Db, MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { DB_CONFIG } from '~common/constants';
import { DBConfig } from '~config/index';

@Module({
  providers: [
    {
      provide: dbConnectionProvider,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          const { url, dbName } = configService.get<DBConfig>(DB_CONFIG);
          const client = await MongoClient.connect(url);

          Logger.log('MongoDB connected successfully');

          return client.db(dbName);
        } catch (error) {
          Logger.log(`MongoDB connection error: ${error.message}`, 'error');
          throw error;
        }
      },
      inject: [ConfigService],
    },
    ...dbProviders,
  ],
  exports: [dbConnectionProvider, ...dbProviderNames],
})
export class DatabaseModule {}
