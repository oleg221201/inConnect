import {
  Controller,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
  Get,
  Request,
  UseGuards,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { ApiTags } from '@nestjs/swagger';
import { DefaultMessageResponse } from '~common/responses';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { CreateRequestDto, RequestDto } from './dto';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/user.model';
import { LecturerService } from 'src/modules/user/lecturer/lecturer.service';
import { ObjectId } from 'mongodb';
import { RequestModel } from './request.model';
import { IdValidationPipe } from '~common/pipes/validateId.pipe';
import { UpdateRequestStatusDto } from './dto/update-status.dto';

@ApiTags('Requests')
@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly lecturerService: LecturerService,
  ) {}

  @UseSwagger({
    operation: { summary: 'Create request' },
    response: {
      description: 'Successfully created request',
      type: DefaultMessageResponse,
      status: HttpStatus.CREATED,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.organizer)
  @Post()
  async create(
    @Body() createRequestDto: CreateRequestDto,
    @Request() request: RequestWithUser,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const isLecturerExists = await this.lecturerService.findOne({
      _id: new ObjectId(createRequestDto.lecturerId),
    });

    if (!isLecturerExists) {
      throw new BadRequestException(i18n.t('error.LECTURER.NOT_FOUND'));
    }

    await this.requestService.create(
      createRequestDto,
      request.user.organizer._id,
    );

    return { message: i18n.t('message.SUCCESS_CREATE') };
  }

  @UseSwagger({
    operation: { summary: 'Get created requests' },
    response: {
      description: 'Successfully got requests',
      type: RequestDto,
      isArray: true,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.organizer)
  @Get('/organizer/my')
  async getOrganizatorsRequests(
    @Request() request: RequestWithUser,
  ): Promise<RequestModel[]> {
    const organizerId = request.user.organizer._id;

    return this.requestService.find({
      organizerId: new ObjectId(organizerId),
      date: { $gte: new Date() },
    });
  }

  @UseSwagger({
    operation: { summary: 'Get assigned requests' },
    response: {
      description: 'Successfully got requests',
      type: RequestDto,
      isArray: true,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.lecturer)
  @Get('/lecturer/my')
  async getLecturersRequests(
    @Request() request: RequestWithUser,
  ): Promise<RequestModel[]> {
    const lecturerId = request.user.lecturer._id;

    return this.requestService.find({
      lecturerId: new ObjectId(lecturerId),
      date: { $gte: new Date() },
    });
  }

  @UseSwagger({
    operation: { summary: 'Approve' },
    response: {
      description: 'Successfully updated profile picture',
      type: DefaultMessageResponse,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.lecturer)
  @Put('/:id/status')
  async approveRequest(
    @Request() req: RequestWithUser,
    @Param('id', IdValidationPipe) id: string,
    @Body() updateRequestStatusDto: UpdateRequestStatusDto,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const lecturerId = req.user.lecturer._id;

    const request = await this.requestService.findById(id);

    if (!request) {
      throw new NotFoundException(i18n.t('error.REQUEST.NOT_FOUND'));
    }

    const isPermited = new ObjectId(lecturerId).equals(request.lecturerId);

    if (!isPermited) {
      throw new BadRequestException(i18n.t('error.REQUEST.NOT_PERMITED'));
    }

    await this.requestService.updateStatus(id, updateRequestStatusDto.status);

    return { message: i18n.t('message.SUCCESS_UPDATE') };
  }
}
