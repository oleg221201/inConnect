import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Strategies } from 'src/modules/auth/auth.constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(Strategies.ACCESS) {}
