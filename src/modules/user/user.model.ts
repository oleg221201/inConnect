import { ObjectId } from 'mongodb';

export interface UserModel {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  additionalName: string;
  headline: string;
  email: string;
  phone: string;
  description: string;
  location: {
    city: string;
    region: string;
  };
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  organizer = 'organizer',
  speaker = 'speaker',
}
