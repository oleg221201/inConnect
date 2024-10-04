import { ObjectId } from 'mongodb';
import { UserModel } from '../user.model';

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

export interface OrganizerWithUser {
  organizer: OrganizerModel;
  user: UserModel;
}
