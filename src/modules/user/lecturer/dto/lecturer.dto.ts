import { ApiProperty } from '@nestjs/swagger';
import {
  LecturerTestimonials,
  LecturerLecture,
  LecturerModel,
  LecturerVideoLink,
  LecturerProfileWithUser,
} from '../lecturer.model';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { UserDto } from '../../dto/user.dto';

class UserLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  region: string;
}

class LecturerExperienceDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;
}

class LecturerTestimonialsDto implements LecturerTestimonials {
  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;
}

class LecturerVideoLinkDto implements LecturerVideoLink {
  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;
}

class LecturerLectureDto implements LecturerLecture {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  time: string;
}

export class LecturerDto implements LecturerModel {
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
  readyToTravel: boolean;

  @ApiProperty()
  experience: LecturerExperienceDto;

  @ApiProperty()
  tags: string[];

  @ApiProperty({ type: LecturerTestimonialsDto, isArray: true })
  testimonials: LecturerTestimonialsDto[];

  @ApiProperty({ type: LecturerVideoLinkDto, isArray: true })
  videoLinks: LecturerVideoLinkDto[];

  @ApiProperty({ type: LecturerLectureDto, isArray: true })
  lectures: LecturerLectureDto[];

  @Exclude()
  userId: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class LecturerProfileWithUserDto implements LecturerProfileWithUser {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  @Type(() => LecturerDto)
  lecturer: LecturerDto;

  @ApiProperty()
  minPrice: number;
}
