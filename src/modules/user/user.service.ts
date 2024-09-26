import { Inject, Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
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
      additionalName: '',
      headline: '',
      phone: '',
      description: '',
      location: {
        city: '',
        region: '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.userCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }

  async findByEmail(email: string): Promise<UserModel> {
    return this.userCollection.findOne({ email });
  }
}
