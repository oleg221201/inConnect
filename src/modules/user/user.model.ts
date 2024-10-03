import { ObjectId } from 'mongodb';

export interface UserModel {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  password: string;
  role: UserRole;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  organizer = 'organizer',
  speaker = 'speaker',
}
