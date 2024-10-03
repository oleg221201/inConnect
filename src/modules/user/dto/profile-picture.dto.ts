import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfilePictureDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  profilePicture: string;
}
