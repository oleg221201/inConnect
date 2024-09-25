import { Provider } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { dbConnectionProvider } from '../services/db/db.constants';

export const getCollectionProviderName = (collectionName: string): string => {
  return `${collectionName}CollectionProvider`;
};

export const getProviders = (collections: string[]): Provider[] => {
  return collections.map(
    (collection: string): Provider => ({
      provide: getCollectionProviderName(collection),
      useFactory: async (db: Db): Promise<Collection> =>
        db.collection(collection),
      inject: [dbConnectionProvider],
    }),
  );
};
