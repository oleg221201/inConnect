import { Injectable } from '@nestjs/common';
import { TokenPayload, Tokens } from './auth.types';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~config/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByTokenPayload({ _id }: TokenPayload): Promise<UserModel> {
    const user = await this.userService.findById(_id);

    if (!user) return null;

    return user;
  }

  getAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  getRefreshToken(payload: TokenPayload): string {
    const { refreshExpires, refreshSecret } =
      this.configService.get<AuthConfig>(AUTH_CONFIG);

    return this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpires,
    });
  }

  generateTokens(_id: string | ObjectId): Tokens {
    const payload = { _id };

    const accessToken = this.getAccessToken(payload);
    const refreshToken = this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
