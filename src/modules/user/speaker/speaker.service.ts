import { Inject, Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { collections } from '../../../services/db/db.constants';
import { SpeakerModel } from './speaker.model';

@Injectable()
export class SpeakerService {
  constructor(
    @Inject(getCollectionProviderName(collections.speaker))
    private readonly speakerCollection: Collection<SpeakerModel>,
  ) {}

  async create(userId: ObjectId | string): Promise<SpeakerModel> {
    const payload: SpeakerModel = {
      userId: new ObjectId(userId),
      additionalName: null,
      headline: null,
      phone: null,
      description: null,
      location: null,
      readyToTrevel: null,
      tags: [],
      workspaces: [],
      educations: [],
      videoLinks: [],
      lectures: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.speakerCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }
}
