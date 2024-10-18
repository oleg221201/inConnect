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
import { LecturerProfileWithUser } from './lecturer.model';
import { LecturerService } from './lecturer.service';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from '../user.model';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { LecturerProfileWithUserDto } from './dto/lecturer.dto';
import { DefaultMessageResponse } from '~common/responses';
import { UpdateLecturerDto } from './dto/update.dto';
import { IdValidationPipe } from '~common/pipes/validateId.pipe';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Lecturers')
@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @UseSwagger({
    operation: { summary: 'Get lecturer based on accessToken' },
    response: {
      description: 'Successfully got lecturer',
      type: LecturerProfileWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(LecturerProfileWithUserDto))
  @Roles(UserRole.lecturer)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('/me')
  async showMe(
    @Request() request: RequestWithUser,
  ): Promise<LecturerProfileWithUser> {
    const lecturerId = request.user.lecturer._id;
    const result =
      await this.lecturerService.findProfileByIdWithUser(lecturerId);

    return result;
  }

  @UseSwagger({
    operation: { summary: 'Get organizer based on id' },
    response: {
      description: 'Successfully got organizer',
      type: LecturerProfileWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(LecturerProfileWithUserDto))
  @Roles(UserRole.organizer)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('/:id')
  async show(
    @Param('id', IdValidationPipe) id: string,
    @I18n() i18n: I18nContext,
  ): Promise<LecturerProfileWithUser> {
    const result = await this.lecturerService.findProfileByIdWithUser(id);

    if (!result) {
      throw new NotFoundException(i18n.t('error.LECTURER.NOT_FOUND'));
    }

    return result;
  }

  @UseSwagger({
    operation: { summary: 'Update lecturer' },
    response: {
      description: 'Successfully updated lecturer',
      type: DefaultMessageResponse,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @Roles(UserRole.lecturer)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put('/me')
  async update(
    @Request() request: RequestWithUser,
    @Body() updateLecturerDto: UpdateLecturerDto,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const { lecturer } = request.user;

    await this.lecturerService.update(lecturer._id, updateLecturerDto);

    return { message: i18n.t('message.SUCCESS_UPDATE') };
  }
}
