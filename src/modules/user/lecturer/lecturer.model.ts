import { ObjectId } from 'mongodb';
import { UserModel } from '../user.model';

export interface LecturerModel {
  _id?: ObjectId;
  additionalName: string;
  headline: string;
  phone: string;
  description: string;
  location: {
    city: string;
    region: string;
  };
  readyToTravel: boolean;
  tags: Array<string>;
  workspaces: Array<LecturerWorkspace>;
  educations: Array<LecturerEducation>;
  videoLinks: Array<LecturerVideoLink>;
  lectures: Array<LecturerLecture>;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface LecturerWorkspace {
  jobTitle: string;
  companyName: string;
  industry: string;
  from: Date;
  to?: Date;
}

export interface LecturerEducation {
  speciality: string;
  university: string;
  from: Date;
  to?: Date;
}

export interface LecturerVideoLink {
  title: string;
  url: string;
}

export interface LecturerLecture {
  title: string;
  description: string;
  price: number;
  time: string;
}

export interface LecturerWithUser {
  lecturer: LecturerModel;
  user: UserModel;
}
