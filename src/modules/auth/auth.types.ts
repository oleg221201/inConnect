import { ObjectId } from 'mongodb';

export type TokenPayload = {
  _id: string | ObjectId;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
