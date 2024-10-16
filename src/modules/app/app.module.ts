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
import {
  AcceptLanguageResolver,
  // I18nJsonLoader,
  I18nModule,
} from 'nestjs-i18n';
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
      // inject: [],
    }),
    DatabaseModule,
    UserModule,
    LecturerModule,
    OrganizerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
