import { ObjectId } from 'mongodb';

export interface OrganizerModel {
  _id?: ObjectId;
  companyInfo: {
    name: string;
    title: string;
    description: string;
    logoUrl: string;
  };
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
