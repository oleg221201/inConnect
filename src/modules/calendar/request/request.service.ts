import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { RequestModel, RequestStatus } from './request.model';
import { collections } from '../../../services/db/db.constants';
import { CreateRequestDto } from './dto';

@Injectable()
export class RequestService {
  constructor(
    @Inject(getCollectionProviderName(collections.requests))
    private readonly requestCollection: Collection<RequestModel>,
  ) {}

  async create(
    dto: CreateRequestDto,
    organizerId: string | ObjectId,
  ): Promise<RequestModel> {
    const payload: RequestModel = {
      ...dto,
      date: new Date(dto.date),
      status: RequestStatus.PENDING,
      organizerId: new ObjectId(organizerId),
      lecturerId: new ObjectId(dto.lecturerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await this.requestCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }

  findOne(filter: Filter<RequestModel>): Promise<RequestModel | null> {
    return this.requestCollection.findOne(filter);
  }

  findById(id: ObjectId | string): Promise<RequestModel | null> {
    return this.requestCollection.findOne({ _id: new ObjectId(id) });
  }

  find(filter: Filter<RequestModel>): Promise<RequestModel[]> {
    return this.requestCollection.find(filter).toArray();
  }

  async updateStatus(
    id: ObjectId | string,
    status: RequestStatus,
  ): Promise<void> {
    await this.requestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } },
    );
  }
}
