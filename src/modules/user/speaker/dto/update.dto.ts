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
  SpeakerModel,
  SpeakerEducation,
  SpeakerLecture,
  SpeakerVideoLink,
  SpeakerWorkspace,
} from '../speaker.model';
import { passwordRegex } from '../../dto/user.dto';
import {
  CITIES_LIST,
  INDUSTRIES_LIST,
  REGIONS_LIST,
  TAGS_LIST,
} from '~common/constants';
import { Type } from 'class-transformer';
import { LECTURE_TIME_LIST } from '~common/constants/lecture-time.constant';

export class UpdateSpeakerLocation {
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

export class UpdateSpeakerWorkspace implements SpeakerWorkspace {
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

export class UpdateSpeakerEducation implements SpeakerEducation {
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

export class UpdateSpeakerVideoLink implements SpeakerVideoLink {
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

export class UpdateSpeakerLecture implements SpeakerLecture {
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

export class UpdateSpeakerDto implements Partial<SpeakerModel> {
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

  @ApiProperty({ type: UpdateSpeakerLocation })
  @ValidateNested()
  @Type(() => UpdateSpeakerLocation)
  @IsNotEmpty()
  location: UpdateSpeakerLocation;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readyToTravel: boolean;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(TAGS_LIST, { each: true, message: 'Choose valid tags' })
  tags: string[];

  @ApiProperty({ isArray: true, type: UpdateSpeakerWorkspace })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSpeakerWorkspace)
  workspaces: UpdateSpeakerWorkspace[];

  @ApiProperty({ isArray: true, type: UpdateSpeakerEducation })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSpeakerEducation)
  educations: UpdateSpeakerEducation[];

  @ApiProperty({ isArray: true, type: UpdateSpeakerVideoLink })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSpeakerVideoLink)
  videoLinks: UpdateSpeakerVideoLink[];

  @ApiProperty({ isArray: true, type: UpdateSpeakerLecture })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSpeakerLecture)
  lectures: UpdateSpeakerLecture[];

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
