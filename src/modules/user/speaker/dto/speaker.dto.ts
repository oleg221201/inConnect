import { ApiProperty } from '@nestjs/swagger';
import {
  SpeakerEducation,
  SpeakerLecture,
  SpeakerModel,
  SpeakerVideoLink,
  SpeakerWorkspace,
} from '../speaker.model';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { UserDto } from '../../dto/user.dto';

class UserLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  region: string;
}

class SpeakerWorkspaceDto implements SpeakerWorkspace {
  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  industry: string;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  to?: Date;
}

class SpeakerEducationDto implements SpeakerEducation {
  @ApiProperty()
  speciality: string;

  @ApiProperty()
  university: string;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  to?: Date;
}

class SpeakerVideoLinkDto implements SpeakerVideoLink {
  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}

class SpeakerLectureDto implements SpeakerLecture {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  time: string;
}

export class SpeakerDto implements SpeakerModel {
  @ApiProperty({ type: 'string' })
  @Type(() => String)
  _id?: ObjectId;

  @ApiProperty()
  additionalName: string;

  @ApiProperty()
  headline: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: UserLocationDto;

  @ApiProperty()
  readyToTrevel: boolean;

  @ApiProperty()
  tags: string[];

  @ApiProperty({ type: SpeakerWorkspaceDto, isArray: true })
  workspaces: SpeakerWorkspaceDto[];

  @ApiProperty({ type: SpeakerEducationDto, isArray: true })
  educations: SpeakerEducationDto[];

  @ApiProperty({ type: SpeakerVideoLinkDto, isArray: true })
  videoLinks: SpeakerVideoLinkDto[];

  @ApiProperty({ type: SpeakerLectureDto, isArray: true })
  lectures: SpeakerLectureDto[];

  @Exclude()
  userId: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class SpeakerWithUserDto {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  @Type(() => SpeakerDto)
  speaker: SpeakerDto;
}
