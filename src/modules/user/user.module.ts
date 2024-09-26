import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../services/db/db.module';
import { OrganizerModule } from './organizer/organizer.module';
import { SpeakerModule } from './speaker/speaker.module';

@Module({
  imports: [DatabaseModule, OrganizerModule, SpeakerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
