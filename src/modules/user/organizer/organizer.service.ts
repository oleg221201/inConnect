import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { collections } from '../../../services/db/db.constants';
import { OrganizerModel, OrganizerWithUser } from './organizer.model';
import { UpdateOrganizerDto } from './dto/update.dto';
import { UserModel } from '../user.model';
import { hashPassword } from '~utils/crypto.util';

@Injectable()
export class OrganizerService {
  constructor(
    @Inject(getCollectionProviderName(collections.organizers))
    private readonly organizerCollection: Collection<OrganizerModel>,
    @Inject(getCollectionProviderName(collections.users))
    private readonly userCollection: Collection<UserModel>,
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

  findOne(filter: Filter<OrganizerModel>): Promise<OrganizerModel | null> {
    return this.organizerCollection.findOne(filter);
  }

  async findByIdWithUser(
    id: ObjectId | string,
  ): Promise<OrganizerWithUser | null> {
    const result = await this.organizerCollection
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
      organizer: organizer as OrganizerModel,
      user: users[0],
    };
  }

  async update(id: string | ObjectId, dto: UpdateOrganizerDto): Promise<void> {
    const { password, ...payload } = dto;
    const organizer = await this.organizerCollection.findOneAndUpdate(
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
