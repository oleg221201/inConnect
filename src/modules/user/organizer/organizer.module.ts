import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { DatabaseModule } from '../../../services/db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [OrganizerService],
  exports: [OrganizerService],
})
export class OrganizerModule {}
