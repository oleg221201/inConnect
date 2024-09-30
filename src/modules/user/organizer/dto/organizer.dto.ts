import { ApiProperty } from '@nestjs/swagger';
import { OrganizerModel } from '../organizer.model';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { UserDto } from '../../dto/user.dto';

class UserLocationDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  region: string;
}

class CompanyInfoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  logoUrl: string;
}

export class OrganizerDto implements OrganizerModel {
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
  companyInfo: CompanyInfoDto;

  @Exclude()
  userId: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class OrganizerWithUserDto {
  @ApiProperty()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty()
  @Type(() => OrganizerDto)
  organizer: OrganizerDto;
}
