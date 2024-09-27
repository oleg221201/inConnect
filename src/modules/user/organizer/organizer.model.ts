import { ObjectId } from 'mongodb';

export interface OrganizerModel {
  _id?: ObjectId;
  additionalName: string;
  headline: string;
  phone: string;
  description: string;
  location: {
    city: string;
    region: string;
  };
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
