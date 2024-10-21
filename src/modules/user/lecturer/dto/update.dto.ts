import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
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
  LecturerTestimonials,
  LecturerLecture,
  LecturerVideoLink,
} from '../lecturer.model';
import { passwordRegex } from '../../dto/user.dto';
import { CITIES_LIST, REGIONS_LIST, TAGS_LIST } from '~common/constants';
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

export class UpdateLecturerExperience {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2800)
  text: string;
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

  @ApiProperty({ type: UpdateLecturerExperience })
  @ValidateNested()
  @Type(() => UpdateLecturerExperience)
  @IsNotEmpty()
  experience: UpdateLecturerExperience;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readyToTravel: boolean;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(TAGS_LIST, { each: true, message: 'Choose valid tags' })
  tags: string[];

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
