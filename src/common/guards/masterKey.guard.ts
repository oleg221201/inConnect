import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { AUTH_CONFIG } from '~common/constants';
import { AuthConfig } from '~config/types';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class MasterKeyGuard implements CanActivate {
  constructor(
    private readonly i18n: I18nService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest<RequestWithUser>();

    const masterKeyHeader = headers.authorization;

    const { masterKey } = this.configService.get<AuthConfig>(AUTH_CONFIG);

    if (!masterKeyHeader || masterKeyHeader !== masterKey) {
      throw new UnauthorizedException(
        this.i18n.t('error.AUTH.INVALID_MASTER_KEY', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return true;
  }
}
