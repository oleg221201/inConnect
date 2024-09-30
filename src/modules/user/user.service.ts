import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, MatchKeysAndValues, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { UserModel } from './user.model';
import { collections } from '../../services/db/db.constants';
import { hashPassword } from '~utils/crypto.util';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(getCollectionProviderName(collections.users))
    private readonly userCollection: Collection<UserModel>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserModel> {
    const hashedPassword = await hashPassword(dto.password);

    const payload: UserModel = {
      ...dto,
      password: hashedPassword,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.userCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userCollection.findOne({ email });
  }

  findOne(filter: Filter<UserModel>): Promise<UserModel | null> {
    return this.userCollection.findOne(filter);
  }

  findById(id: ObjectId | string): Promise<UserModel | null> {
    return this.userCollection.findOne({ _id: new ObjectId(id) });
  }

  async updateById(
    id: string | ObjectId,
    updateData: MatchKeysAndValues<UserModel>,
  ): Promise<void> {
    await this.userCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    );
  }
}
