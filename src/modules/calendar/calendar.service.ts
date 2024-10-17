import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CalendarDto } from './dto';
import { GetCalendarQueryDto } from './dto/get-query.dto';
import { RequestService } from './request/request.service';
import { OccupiedPeriodService } from './occupied_period/occupied_period.service';

@Injectable()
export class CalendarService {
  constructor(
    private readonly requestService: RequestService,
    private readonly occupiedPeriodService: OccupiedPeriodService,
  ) {}

  async getByPeriod(
    period: GetCalendarQueryDto,
    lecturerId: ObjectId | string,
  ): Promise<CalendarDto> {
    const { from: fromDateString, to: toDateString } = period;

    const requests = await this.requestService.find({
      $and: [
        { date: { $gte: new Date(fromDateString) } },
        { date: { $lte: new Date(toDateString) } },
      ],
      lecturerId: new ObjectId(lecturerId),
    });

    const occupiedPeriods = await this.occupiedPeriodService.findOverlaps(
      new Date(fromDateString),
      new Date(toDateString),
      lecturerId,
    );

    return { requests, occupiedPeriods };
  }
}
