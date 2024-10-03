import { ApiProperty } from '@nestjs/swagger';
import { UserModel, UserRole } from '../user.model';
import { Exclude, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

// min 6 max 24 symbols, min 1 symbol, min 1 special symbol, min 1 digit
export const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{6,24}$/,
);

export class UserDto implements UserModel {
  @ApiProperty({ type: 'string' })
  @Type(() => String)
  _id?: ObjectId;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @Exclude()
  refreshToken: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
