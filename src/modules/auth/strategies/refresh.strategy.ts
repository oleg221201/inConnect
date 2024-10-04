import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { REFRESH_FIELD, Strategies } from '../auth.constants';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~common/constants';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../auth.types';
import { Injectable } from '@nestjs/common';
import { AuthRequest } from '~common/interfaces/auth.interface';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  Strategies.REFRESH,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { refreshSecret } = configService.get<AuthConfig>(AUTH_CONFIG);
    super({
      jwtFromRequest: ExtractJwt.fromBodyField(REFRESH_FIELD),
      secretOrKey: refreshSecret,
    });
  }

  validate(payload: TokenPayload): Promise<AuthRequest> {
    return this.authService.validateUserByTokenPayload(payload);
  }
}
