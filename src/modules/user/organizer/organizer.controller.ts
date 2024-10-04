import {
  Controller,
  HttpStatus,
  Get,
  Request,
  UseInterceptors,
  UseGuards,
  Put,
  Body,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { OrganizerWithUser } from './organizer.model';
import { OrganizerService } from './organizer.service';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from '../user.model';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { OrganizerWithUserDto } from './dto/organizer.dto';
import { DefaultMessageResponse } from '~common/responses';
import { UpdateOrganizerDto } from './dto/update.dto';
import { UploadQueryDto, UploadUrlDto } from '~common/dto/upload.dto';
import { generateUploadUrl } from 'src/services/aws/s3';
import { IdValidationPipe } from '~common/pipes/validateId.pipe';
import { I18n, I18nContext } from 'nestjs-i18n';

@ApiTags('Orgaizers')
@Controller('organizer')
export class OrganizerController {
  constructor(private readonly organizerService: OrganizerService) {}

  @UseSwagger({
    operation: { summary: 'Get organizer based on accessToken' },
    response: {
      description: 'Successfully got organizer',
      type: OrganizerWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(OrganizerWithUserDto))
  @Roles(UserRole.organizer)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('/me')
  showMe(@Request() request: RequestWithUser): OrganizerWithUser {
    const { organizer, ...user } = request.user;
    return { user, organizer };
  }

  @UseSwagger({
    operation: { summary: 'Get organizer based on id' },
    response: {
      description: 'Successfully got organizer',
      type: OrganizerWithUserDto,
      status: HttpStatus.OK,
    },
    auth: true,
  })
  @UseInterceptors(ClassSerializer(OrganizerWithUserDto))
  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async show(
    @Param('id', IdValidationPipe) id: string,
    @I18n() i18n: I18nContext,
  ): Promise<OrganizerWithUser> {
    const result = await this.organizerService.findByIdWithUser(id);

    if (!result) {
      throw new NotFoundException(i18n.t('error.ORGANIZER.NOT_FOUND'));
    }

    return result;
  }

  @UseSwagger({
    operation: { summary: 'Update organizer' },
    response: {
      description: 'Successfully updated organizer',
      type: DefaultMessageResponse,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @Roles(UserRole.organizer)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put('/me')
  async update(
    @Request() request: RequestWithUser,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const { organizer } = request.user;

    await this.organizerService.update(organizer._id, updateOrganizerDto);

    return { message: i18n.t('message.SUCCESS_UPDATE') };
  }

  @UseSwagger({
    operation: { summary: 'Get url for uploading photo' },
    response: {
      description: 'Successfully got url',
      type: UploadUrlDto,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard)
  @Roles(UserRole.organizer)
  @Get('/upload-company-logo')
  async getUploadUrl(
    @Request() request: RequestWithUser,
    @Query() query: UploadQueryDto,
  ): Promise<UploadUrlDto> {
    const { _id: organizerId } = request.user.organizer;
    const { mime } = query;
    const fileName = `company-logo/${organizerId}`;

    const url = await generateUploadUrl(fileName, mime);

    return { url };
  }
}
