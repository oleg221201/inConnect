import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../services/db/db.module';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { LecturerModule } from 'src/modules/user/lecturer/lecturer.module';

@Module({
  imports: [DatabaseModule, LecturerModule],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
