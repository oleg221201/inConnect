import { Provider } from '@nestjs/common';
import { getCollectionProviderName, getProviders } from '~utils/db.utils';

export const dbConnectionProvider = 'DATABASE_CONNECTION';

export const collections = {
  users: 'users',
  organizers: 'organizers',
  speaker: 'speakers',
};

const collectionsNames: string[] = Object.values(collections);

export const dbProviders: Provider[] = getProviders(collectionsNames);

export const dbProviderNames: string[] = collectionsNames.map((collection) =>
  getCollectionProviderName(collection),
);
