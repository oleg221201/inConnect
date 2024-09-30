import { Injectable } from '@nestjs/common';
import { TokenPayload, Tokens } from './auth.types';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user.model';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '~config/types';
import { AUTH_CONFIG } from '~config/constants';
import { OrganizerService } from '../user/organizer/organizer.service';
import { SpeakerService } from '../user/speaker/speaker.service';
import { AuthRequest } from '~common/interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly organiserService: OrganizerService,
    private readonly speakerService: SpeakerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByTokenPayload({
    _id,
  }: TokenPayload): Promise<AuthRequest> {
    const user = await this.userService.findById(_id);

    if (!user) return null;

    switch (user.role) {
      case UserRole.organizer: {
        const organizer = await this.organiserService.findOne({
          userId: new ObjectId(_id),
        });

        return { ...user, organizer } as unknown as AuthRequest;
      }

      case UserRole.speaker: {
        const speaker = await this.speakerService.findOne({
          userId: new ObjectId(_id),
        });

        return { ...user, speaker } as unknown as AuthRequest;
      }

      default: {
        return user as unknown as AuthRequest;
      }
    }
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
