import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { OrganizerModel } from '../organizer.model';
import { passwordRegex } from '../../dto/user.dto';

export class UpdateOrganizerLocation {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string; // TODO List of available cities

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  region: string; // TODO List of available regions
}

export class UpdateOrganizerCompanyInfo {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(2800)
  description: string;

  @ApiProperty()
  @IsNotEmpty() // TODO check it
  @IsString()
  logoUrl: string;
}

export class UpdateOrganizerDto implements Partial<OrganizerModel> {
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

  @ApiProperty({ type: UpdateOrganizerLocation })
  @IsNotEmpty()
  location: UpdateOrganizerLocation;

  @ApiProperty({ type: UpdateOrganizerCompanyInfo })
  @IsOptional()
  companyInfo: UpdateOrganizerCompanyInfo;

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
