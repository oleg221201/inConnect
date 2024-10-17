import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { collections } from '../../../services/db/db.constants';
import { LecturerModel, LecturerWithUser } from './lecturer.model';
import { UpdateLecturerDto } from './dto/update.dto';
import { hashPassword } from '~utils/crypto.util';
import { UserModel } from '../user.model';

@Injectable()
export class LecturerService {
  constructor(
    @Inject(getCollectionProviderName(collections.lecturer))
    private readonly lecturerCollection: Collection<LecturerModel>,
    @Inject(getCollectionProviderName(collections.users))
    private readonly userCollection: Collection<UserModel>,
  ) {}

  async create(userId: ObjectId | string): Promise<LecturerModel> {
    const payload: LecturerModel = {
      userId: new ObjectId(userId),
      additionalName: null,
      headline: null,
      phone: null,
      description: null,
      location: null,
      readyToTravel: null,
      tags: [],
      workspaces: [],
      educations: [],
      testimonials: [],
      videoLinks: [],
      lectures: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.lecturerCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }

  findOne(filter: Filter<LecturerModel>): Promise<LecturerModel | null> {
    return this.lecturerCollection.findOne(filter);
  }

  async findByIdWithUser(
    id: ObjectId | string,
  ): Promise<LecturerWithUser | null> {
    const result = await this.lecturerCollection
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
      lecturer: organizer as LecturerModel,
      user: users[0],
    };
  }

  async update(id: string | ObjectId, dto: UpdateLecturerDto): Promise<void> {
    const { password, ...payload } = dto;
    const organizer = await this.lecturerCollection.findOneAndUpdate(
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
