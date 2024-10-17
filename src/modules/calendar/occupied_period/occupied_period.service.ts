import { Inject, Injectable } from '@nestjs/common';
import { Collection, Filter, ObjectId } from 'mongodb';
import { getCollectionProviderName } from '~utils/db.utils';
import { OccupiedPeriodModel } from './occupied_period.model';
import { collections } from '../../../services/db/db.constants';
import { CreateOccupiedPeriodDto } from './dto';

@Injectable()
export class OccupiedPeriodService {
  constructor(
    @Inject(getCollectionProviderName(collections.occupiedPeriod))
    private readonly occupiedPeriodCollection: Collection<OccupiedPeriodModel>,
  ) {}

  async create(
    dto: CreateOccupiedPeriodDto,
    lecturerId: string | ObjectId,
  ): Promise<OccupiedPeriodModel> {
    const payload: OccupiedPeriodModel = {
      from: new Date(dto.from),
      to: new Date(dto.to),
      lecturerId: new ObjectId(lecturerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } =
      await this.occupiedPeriodCollection.insertOne(payload);
    return { _id: insertedId, ...payload };
  }

  find(filter: Filter<OccupiedPeriodModel>): Promise<OccupiedPeriodModel[]> {
    return this.occupiedPeriodCollection.find(filter).toArray();
  }

  findOverlaps(
    from: Date,
    to: Date,
    lecturerId: ObjectId | string,
  ): Promise<OccupiedPeriodModel[]> {
    return this.find({
      lecturerId: new ObjectId(lecturerId),
      $or: [
        {
          from: { $lte: to },
          to: { $gte: from },
        },
        {
          from: { $lte: from },
          to: { $gte: to },
        },
      ],
    });
  }
}
