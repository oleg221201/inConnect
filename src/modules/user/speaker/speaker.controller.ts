import {
  Controller,
  HttpStatus,
  Get,
  Request,
  UseInterceptors,
  UseGuards,
  Body,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { SpeakerWithUser } from './speaker.model';
import { SpeakerService } from './speaker.service';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from '../user.model';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { SpeakerWithUserDto } from './dto/speaker.dto';
import { DefaultMessageResponse } from '~common/responses';
import { UpdateSpeakerDto } from './dto/update.dto';
import { IdValidationPipe } from '~common/pipes/validateId.pipe';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Speakers')
@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @UseSwagger({
    operation: { summary: 'Get speaker based on accessToken' },
    response: {
      description: 'Successfully got speaker',
      type: SpeakerWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(SpeakerWithUserDto))
  @Roles(UserRole.speaker)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('/me')
  showMe(@Request() request: RequestWithUser): SpeakerWithUser {
    const { speaker, ...user } = request.user;
    return { user, speaker };
  }

  @UseSwagger({
    operation: { summary: 'Get organizer based on id' },
    response: {
      description: 'Successfully got organizer',
      type: SpeakerWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(SpeakerWithUserDto))
  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async show(
    @Param('id', IdValidationPipe) id: string,
    @I18n() i18n: I18nContext,
  ): Promise<SpeakerWithUser> {
    const result = await this.speakerService.findByIdWithUser(id);

    if (!result) {
      throw new NotFoundException(i18n.t('error.SPEAKER.NOT_FOUND'));
    }

    return result;
  }

  @UseSwagger({
    operation: { summary: 'Update speaker' },
    response: {
      description: 'Successfully updated speaker',
      type: DefaultMessageResponse,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @Roles(UserRole.speaker)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put('/me')
  async update(
    @Request() request: RequestWithUser,
    @Body() updateSpeakerDto: UpdateSpeakerDto,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const { speaker } = request.user;

    await this.speakerService.update(speaker._id, updateSpeakerDto);

    return { message: i18n.t('message.USER.SUCCESS_UPDATE') };
  }
}
