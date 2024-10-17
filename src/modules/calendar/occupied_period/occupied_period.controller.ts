import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { OccupiedPeriodService } from './occupied_period.service';
import { ApiTags } from '@nestjs/swagger';
import { DefaultMessageResponse } from '~common/responses';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { CreateOccupiedPeriodDto } from './dto';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/user.model';
import { RequestService } from '../request/request.service';
import { ObjectId } from 'mongodb';

@ApiTags('OccupiedPeriods')
@Controller('occupied-period')
export class OccupiedPeriodController {
  constructor(
    private readonly occupiedPeriodService: OccupiedPeriodService,
    private readonly requestService: RequestService,
  ) {}

  @UseSwagger({
    operation: { summary: 'Create occupied period' },
    response: {
      description: 'Successfully created occupied period',
      type: DefaultMessageResponse,
      status: HttpStatus.CREATED,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.lecturer)
  @Post()
  async create(
    @Body() createOccupiedPeriodDto: CreateOccupiedPeriodDto,
    @Request() request: RequestWithUser,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const lecturerId = request.user.lecturer._id;
    const { from, to } = createOccupiedPeriodDto;

    const isPeriodOverlap = await this.occupiedPeriodService.findOverlaps(
      new Date(from),
      new Date(to),
      lecturerId,
    );

    if (isPeriodOverlap.length) {
      throw new BadRequestException(i18n.t('error.OCCUPIED_PERIOD.OVERLAP'));
    }

    const isRequestOverlap = await this.requestService.find({
      $and: [
        { date: { $gte: new Date(from) } },
        { date: { $lte: new Date(to) } },
      ],
      lecturerId: new ObjectId(lecturerId),
    });

    if (isRequestOverlap.length) {
      throw new BadRequestException(
        i18n.t('error.OCCUPIED_PERIOD.REQUEST_OVERLAP'),
      );
    }

    await this.occupiedPeriodService.create(
      createOccupiedPeriodDto,
      lecturerId,
    );

    return { message: i18n.t('message.SUCCESS_CREATE') };
  }
}
