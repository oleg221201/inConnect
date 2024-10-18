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
  experience: {
    title: string;
    text: string;
  };
  tags: Array<string>;
  testimonials: Array<LecturerTestimonials>;
  videoLinks: Array<LecturerVideoLink>;
  lectures: Array<LecturerLecture>;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface LecturerTestimonials {
  title: string;
  text: string;
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
