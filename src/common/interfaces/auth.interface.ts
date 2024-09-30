import { UserModel } from 'src/modules/user/user.model';
import { Request } from 'express';
import { OrganizerModel } from 'src/modules/user/organizer/organizer.model';
import { SpeakerModel } from 'src/modules/user/speaker/speaker.model';

type ExpendedUser = UserModel & {
  organizer?: OrganizerModel;
  speaker?: SpeakerModel;
};

export interface AuthRequest {
  user: ExpendedUser;
}

export type RequestWithUser = Request & AuthRequest;
