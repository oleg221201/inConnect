import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { OrganizerModel } from '../organizer.model';
import { passwordRegex } from '../../dto/user.dto';
import { CITIES_LIST, REGIONS_LIST } from '~common/constants';
import { Type } from 'class-transformer';

export class UpdateOrganizerLocation {
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
  @IsOptional()
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
  @ValidateNested()
  @Type(() => UpdateOrganizerLocation)
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
