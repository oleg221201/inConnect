import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { Strategies } from './auth.constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~common/constants';
import { UserModule } from '../user/user.module';
import { AccessStrategy, RefreshStrategy } from './strategies';
import { LecturerModule } from '../user/lecturer/lecturer.module';
import { OrganizerModule } from '../user/organizer/organizer.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: Strategies.ACCESS,
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const { accessExpires, accessSecret } =
          configService.get<AuthConfig>(AUTH_CONFIG);

        return {
          secret: accessSecret,
          signOptions: {
            expiresIn: accessExpires,
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    LecturerModule,
    OrganizerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessStrategy, RefreshStrategy],
})
export class AuthModule {}
