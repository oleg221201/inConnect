import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  LecturerModel,
  LecturerEducation,
  LecturerTestimonials,
  LecturerLecture,
  LecturerVideoLink,
  LecturerWorkspace,
} from '../lecturer.model';
import { passwordRegex } from '../../dto/user.dto';
import {
  CITIES_LIST,
  INDUSTRIES_LIST,
  REGIONS_LIST,
  TAGS_LIST,
} from '~common/constants';
import { Type } from 'class-transformer';
import { LECTURE_TIME_LIST } from '~common/constants/lecture-time.constant';

export class UpdateLecturerLocation {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(CITIES_LIST)
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(REGIONS_LIST)
  region: string;
}

export class UpdateLecturerWorkspace implements LecturerWorkspace {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(INDUSTRIES_LIST, { message: 'Choose valid industry' })
  industry: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  to: Date;
}

export class UpdateLecturerEducation implements LecturerEducation {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  university: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  to: Date;
}

export class UpdateLecturerTestimonials implements LecturerTestimonials {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateLecturerVideoLink implements LecturerVideoLink {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  url: string;
}

export class UpdateLecturerLecture implements LecturerLecture {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2800)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(LECTURE_TIME_LIST)
  time: string;
}

export class UpdateLecturerDto implements Partial<LecturerModel> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  additionalName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  headline: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(2800)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ type: UpdateLecturerLocation })
  @ValidateNested()
  @Type(() => UpdateLecturerLocation)
  @IsNotEmpty()
  location: UpdateLecturerLocation;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readyToTravel: boolean;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(TAGS_LIST, { each: true, message: 'Choose valid tags' })
  tags: string[];

  @ApiProperty({ isArray: true, type: UpdateLecturerWorkspace })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLecturerWorkspace)
  workspaces: UpdateLecturerWorkspace[];

  @ApiProperty({ isArray: true, type: UpdateLecturerEducation })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLecturerEducation)
  educations: UpdateLecturerEducation[];

  @ApiProperty({ isArray: true, type: UpdateLecturerTestimonials })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLecturerTestimonials)
  testimonials: UpdateLecturerTestimonials[];

  @ApiProperty({ isArray: true, type: UpdateLecturerVideoLink })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLecturerVideoLink)
  videoLinks: UpdateLecturerVideoLink[];

  @ApiProperty({ isArray: true, type: UpdateLecturerLecture })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLecturerLecture)
  lectures: UpdateLecturerLecture[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(24)
  @Matches(passwordRegex, {
    message:
      'password must contain a combination of letters, numbers and special character',
  })
  password: string;
}
