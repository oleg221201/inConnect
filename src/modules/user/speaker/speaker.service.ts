import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { collections } from '../../../services/db/db.constants';
import { SpeakerModel, SpeakerWithUser } from './speaker.model';
import { UpdateSpeakerDto } from './dto/update.dto';
import { hashPassword } from '~utils/crypto.util';
import { UserModel } from '../user.model';

@Injectable()
export class SpeakerService {
  constructor(
    @Inject(getCollectionProviderName(collections.speaker))
    private readonly speakerCollection: Collection<SpeakerModel>,
    @Inject(getCollectionProviderName(collections.users))
    private readonly userCollection: Collection<UserModel>,
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

  findOne(filter: Filter<SpeakerModel>): Promise<SpeakerModel | null> {
    return this.speakerCollection.findOne(filter);
  }

  async findByIdWithUser(
    id: ObjectId | string,
  ): Promise<SpeakerWithUser | null> {
    const result = await this.speakerCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users',
          },
        },
      ])
      .toArray();

    if (!result.length) return null;

    const { users, ...organizer } = result[0];

    return {
      speaker: organizer as SpeakerModel,
      user: users[0],
    };
  }

  async update(id: string | ObjectId, dto: UpdateSpeakerDto): Promise<void> {
    const { password, ...payload } = dto;
    const organizer = await this.speakerCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, updatedAt: new Date() } },
    );

    if (password) {
      const preparedPassword = await hashPassword(password);
      await this.userCollection.updateOne(
        {
          _id: new ObjectId(organizer.userId),
        },
        { $set: { password: preparedPassword } },
      );
    }
  }
}
