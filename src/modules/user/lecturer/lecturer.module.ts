import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { DatabaseModule } from '../../../services/db/db.module';
import { LecturerController } from './lecturer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [LecturerController],
  providers: [LecturerService],
  exports: [LecturerService],
})
export class LecturerModule {}
