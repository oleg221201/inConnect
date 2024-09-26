import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as config from '~config/index';
import { DatabaseModule } from '../../services/db/db.module';
import { UserModule } from '../user/user.module';
import { SpeakerModule } from '../user/speaker/speaker.module';
import { OrganizerModule } from '../user/organizer/organizer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: Object.values(config),
    }),
    DatabaseModule,
    UserModule,
    SpeakerModule,
    OrganizerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
