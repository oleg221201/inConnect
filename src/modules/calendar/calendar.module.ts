import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../services/db/db.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [DatabaseModule, RequestModule],
})
export class CalendarModule {}
