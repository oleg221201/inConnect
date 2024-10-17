import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../services/db/db.module';
import { RequestModule } from './request/request.module';
import { OccupiedPeriodModule } from './occupied_period/occupied_period.module';
import { CalendatController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { LecturerModule } from '../user/lecturer/lecturer.module';

@Module({
  imports: [
    DatabaseModule,
    RequestModule,
    OccupiedPeriodModule,
    LecturerModule,
  ],
  controllers: [CalendatController],
  providers: [CalendarService],
})
export class CalendarModule {}
