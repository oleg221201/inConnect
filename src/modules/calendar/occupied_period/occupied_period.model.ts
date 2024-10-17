import { ObjectId } from 'mongodb';

export interface OccupiedPeriodModel {
  _id?: ObjectId;
  from: Date;
  to: Date;
  lecturerId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
