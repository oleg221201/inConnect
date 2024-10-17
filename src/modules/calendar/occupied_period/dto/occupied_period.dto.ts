import { ApiProperty } from '@nestjs/swagger';
import { OccupiedPeriodModel } from '../occupied_period.model';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class OccupiedPeriodDto implements OccupiedPeriodModel {
  @ApiProperty({ type: 'string' })
  @Type(() => String)
  _id?: ObjectId;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  to: Date;

  @ApiProperty({ type: 'string' })
  @Type(() => String)
  lecturerId: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
