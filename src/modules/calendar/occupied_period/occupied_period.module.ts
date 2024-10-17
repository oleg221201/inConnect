import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../services/db/db.module';
import { OccupiedPeriodController } from './occupied_period.controller';
import { OccupiedPeriodService } from './occupied_period.service';
import { RequestModule } from '../request/request.module';

@Module({
  imports: [DatabaseModule, RequestModule],
  controllers: [OccupiedPeriodController],
  providers: [OccupiedPeriodService],
  exports: [OccupiedPeriodService],
})
export class OccupiedPeriodModule {}
