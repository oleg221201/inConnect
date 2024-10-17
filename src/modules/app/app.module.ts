import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as config from '~config/index';
import { DatabaseModule } from '../../services/db/db.module';
import { UserModule } from '../user/user.module';
import { LecturerModule } from '../user/lecturer/lecturer.module';
import { OrganizerModule } from '../user/organizer/organizer.module';
import { AuthModule } from '../auth/auth.module';
import * as path from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { CalendarModule } from '../calendar/calendar.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: Object.values(config),
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '../../i18n/'),
          watch: true,
        },
      }),
      resolvers: [AcceptLanguageResolver],
    }),
    DatabaseModule,
    UserModule,
    LecturerModule,
    OrganizerModule,
    AuthModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
