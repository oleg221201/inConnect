import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { DatabaseModule } from '../../../services/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
