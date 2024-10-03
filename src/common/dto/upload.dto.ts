import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mime: string;
}

export class UploadUrlDto {
  @ApiProperty()
  url: string;
}
