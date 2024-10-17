import {
  Controller,
  HttpStatus,
  Request,
  UseGuards,
  BadRequestException,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserRole } from 'src/modules/user/user.model';
import { CalendarDto } from './dto';
import { IdValidationPipe } from '~common/pipes/validateId.pipe';
import { GetCalendarQueryDto } from './dto/get-query.dto';
import { LecturerService } from '../user/lecturer/lecturer.service';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendatController {
  constructor(
    private readonly calendarService: CalendarService,
    private readonly lecturerService: LecturerService,
  ) {}

  @UseSwagger({
    operation: { summary: 'Get lecturer calendar (by lecturer)' },
    response: {
      description: 'Successfully got lecturer calendar',
      type: CalendarDto,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.lecturer)
  @Get('/my')
  async create(
    @Query() query: GetCalendarQueryDto,
    @Request() request: RequestWithUser,
  ): Promise<CalendarDto> {
    const lecturerId = request.user.lecturer._id;

    const calendar = await this.calendarService.getByPeriod(query, lecturerId);

    return calendar;
  }

  @UseSwagger({
    operation: { summary: 'Get lecturer calendar (by organizer)' },
    response: {
      description: 'Successfully got lecturer calendar',
      type: CalendarDto,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(UserRole.organizer)
  @Get('/:lecturerId')
  async getCalendarByOrganizer(
    @Param('lecturerId', IdValidationPipe) lecturerId: string,
    @Query() query: GetCalendarQueryDto,
    @I18n() i18n: I18nContext,
  ): Promise<CalendarDto> {
    const isLecturerExists = await this.lecturerService.findById(lecturerId);

    if (!isLecturerExists) {
      throw new BadRequestException(i18n.t('error.LECTURER.NOT_FOUND'));
    }

    const calendar = await this.calendarService.getByPeriod(query, lecturerId);

    return calendar;
  }
}
