import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategies } from '../auth.constants';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~config/constants';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../auth.types';
import { UserModel } from 'src/modules/user/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  Strategies.ACCESS,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { accessSecret } = configService.get<AuthConfig>(AUTH_CONFIG);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessSecret,
    });
  }

  validate(payload: TokenPayload): Promise<UserModel> {
    return this.authService.validateUserByTokenPayload(payload);
  }
}
