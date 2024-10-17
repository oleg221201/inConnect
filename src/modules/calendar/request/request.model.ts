import { ObjectId } from 'mongodb';

export interface RequestModel {
  _id?: ObjectId;
  title: string;
  date: Date;
  description: string;
  location: string;
  status: RequestStatus;
  organizerId: ObjectId;
  lecturerId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum RequestStatus {
  PENDING = 'pending',
  APPROVER = 'approved',
  REJECTED = 'rejected',
}
