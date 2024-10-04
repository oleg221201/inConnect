import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Strategies } from '../auth.constants';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~common/constants';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../auth.types';
import { Injectable } from '@nestjs/common';
import { AuthRequest } from '~common/interfaces/auth.interface';

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

  validate(payload: TokenPayload): Promise<AuthRequest> {
    return this.authService.validateUserByTokenPayload(payload);
  }
}
