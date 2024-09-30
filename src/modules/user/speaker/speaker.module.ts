import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { DatabaseModule } from '../../../services/db/db.module';
import { SpeakerController } from './speaker.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
