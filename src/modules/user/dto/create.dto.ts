import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { passwordRegex } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.model';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  @Matches(passwordRegex, {
    message:
      'password must contain a combination of letters, numbers and special character',
  })
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
