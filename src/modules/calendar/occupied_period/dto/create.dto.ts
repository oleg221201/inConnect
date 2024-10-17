import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEqualOrAfterFromDate,
  IsFutureDate,
} from '~common/decorators/date.decorator';

export class CreateOccupiedPeriodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsFutureDate()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsEqualOrAfterFromDate()
  to: string;
}
