import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetCalendarQueryDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  to: string;
}
