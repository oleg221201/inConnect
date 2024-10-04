import {
  Controller,
  HttpStatus,
  Get,
  Request,
  UseInterceptors,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { SpeakerModel } from './speaker.model';
import { SpeakerService } from './speaker.service';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserModel, UserRole } from '../user.model';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { SpeakerWithUserDto } from './dto/speaker.dto';
import { DefaultMessageResponse } from '~common/responses';
import { UpdateSpeakerDto } from './dto/update.dto';

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
  showMe(@Request() request: RequestWithUser): {
    user: UserModel;
    speaker: SpeakerModel;
  } {
    const { speaker, ...user } = request.user;
    return { user, speaker };
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
  ): Promise<DefaultMessageResponse> {
    const { speaker } = request.user;

    await this.speakerService.update(speaker._id, updateSpeakerDto);

    return { message: 'Successfully updated speaker.' };
  }
}
