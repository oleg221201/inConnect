import { ObjectId } from 'mongodb';

export interface SpeakerModel {
  _id?: ObjectId;
  readyToTrevel: boolean;
  tags: Array<string>;
  workspaces: Array<SpeakerWorkspace>;
  educations: Array<SpeakerEducation>;
  videoLinks: Array<SpeakerVideoLink>;
  lectures: Array<SpeakerLecture>;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpeakerWorkspace {
  jobTitle: string;
  companyName: string;
  industry: string;
  from: Date;
  to?: Date;
}

export interface SpeakerEducation {
  speciality: string;
  university: string;
  from: Date;
  to?: Date;
}

export interface SpeakerVideoLink {
  title: string;
  url: string;
}

export interface SpeakerLecture {
  title: string;
  description: string;
  price: number;
  time: string;
}
