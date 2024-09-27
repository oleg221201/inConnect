import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { RequestWithUser } from '~common/interfaces/auth.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('error.AUTH.LOGIN_TO_PERFORM', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return roles.includes(user.role);
  }
}
