import { Inject, Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { collections } from '../../../services/db/db.constants';
import { OrganizerModel } from './organizer.model';

@Injectable()
export class OrganizerService {
  constructor(
    @Inject(getCollectionProviderName(collections.organizers))
    private readonly organizerCollection: Collection<OrganizerModel>,
  ) {}

  async create(userId: ObjectId | string): Promise<OrganizerModel> {
    const payload: OrganizerModel = {
      additionalName: null,
      headline: null,
      phone: null,
      description: null,
      location: null,
      companyInfo: null,
      userId: new ObjectId(userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.organizerCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }
}
