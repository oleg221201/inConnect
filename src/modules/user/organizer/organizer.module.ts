import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { DatabaseModule } from '../../../services/db/db.module';
import { OrganizerController } from './organizer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [OrganizerService],
})
export class OrganizerModule {}
