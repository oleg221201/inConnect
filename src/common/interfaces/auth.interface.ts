import { UserModel } from 'src/modules/user/user.model';
import { Request } from 'express';
import { OrganizerModel } from 'src/modules/user/organizer/organizer.model';
import { SpeakerModel } from 'src/modules/user/speaker/speaker.model';

interface AuthRequest {
  user: UserModel;
  organizer?: OrganizerModel;
  speaker?: SpeakerModel;
}

export type RequestWithUser = Request & AuthRequest;
