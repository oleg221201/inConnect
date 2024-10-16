import { UserModel } from 'src/modules/user/user.model';
import { Request } from 'express';
import { OrganizerModel } from 'src/modules/user/organizer/organizer.model';
import { LecturerModel } from 'src/modules/user/lecturer/lecturer.model';

type ExpendedUser = UserModel & {
  organizer?: OrganizerModel;
  lecturer?: LecturerModel;
};

export interface AuthRequest {
  user: ExpendedUser;
}

export type RequestWithUser = Request & AuthRequest;
