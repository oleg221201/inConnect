import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../services/db/db.module';
import { OrganizerModule } from './organizer/organizer.module';
import { LecturerModule } from './lecturer/lecturer.module';

@Module({
  imports: [DatabaseModule, OrganizerModule, LecturerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
