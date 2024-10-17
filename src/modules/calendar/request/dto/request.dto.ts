import { ApiProperty } from '@nestjs/swagger';
import { RequestModel, RequestStatus } from '../request.model';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class RequestDto implements RequestModel {
  @ApiProperty({ type: 'string' })
  @Type(() => String)
  _id?: ObjectId;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: RequestStatus;

  @ApiProperty({ type: 'string' })
  @Type(() => String)
  organizerId: ObjectId;

  @ApiProperty({ type: 'string' })
  @Type(() => String)
  lecturerId: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
