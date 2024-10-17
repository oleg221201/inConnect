import { ApiProperty } from '@nestjs/swagger';
import { RequestDto } from '../request/dto';
import { OccupiedPeriodDto } from '../occupied_period/dto';

export class CalendarDto {
  @ApiProperty({ type: OccupiedPeriodDto, isArray: true })
  occupiedPeriods: OccupiedPeriodDto[];

  @ApiProperty({ type: RequestDto, isArray: true })
  requests: RequestDto[];
}
