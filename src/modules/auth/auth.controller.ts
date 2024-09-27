import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, TokensResponseDto } from './dto';
import { UserService } from '../user/user.service';
// import { ErrorMessages, ErrorModules } from '~common/errorMessages';
import { comparePassword } from '~utils/crypto.util';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { RefreshTokenGuard } from '~common/guards';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseSwagger({
    operation: { summary: 'User log in' },
    response: {
      description: 'Successfully loged in',
      type: TokensResponseDto,
      status: HttpStatus.OK,
    },
    possibleCodes: [HttpStatus.BAD_REQUEST, HttpStatus.UNAUTHORIZED],
  })
  @UseInterceptors(ClassSerializer(TokensResponseDto))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() { email, password }: LoginDto,
    @I18n() i18n: I18nContext,
  ): Promise<TokensResponseDto> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(i18n.t('error.AUTH.INVALID_LOGIN_DATA'));
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(i18n.t('error.AUTH.INVALID_LOGIN_DATA'));
    }

    const tokens = this.authService.generateTokens(user._id);

    await this.userService.updateById(user._id, {
      refreshToken: tokens.refreshToken,
    });

    return { ...tokens, role: user.role };
  }

  @UseSwagger({
    operation: { summary: 'Refresh token' },
    response: {
      description: 'Successfully refreshed token',
      type: TokensResponseDto,
      status: HttpStatus.OK,
    },
    possibleCodes: [
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.FORBIDDEN,
    ],
  })
  @UseInterceptors(ClassSerializer(TokensResponseDto))
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(
    @Body() body: RefreshDto,
    @Request() request: RequestWithUser,
    @I18n() i18n: I18nContext,
  ): Promise<TokensResponseDto> {
    const user = await this.userService.findOne({
      _id: request.user._id,
      refreshToken: body.refreshToken,
    });

    if (!user) {
      throw new NotFoundException(i18n.t('error.AUTH.REFRESH_NOT_FOUND'));
    }

    const tokens = this.authService.generateTokens(user._id);

    await this.userService.updateById(user._id, {
      refreshToken: tokens.refreshToken,
      updatedAt: new Date(),
    });

    return { ...tokens, role: user.role };
  }
}
