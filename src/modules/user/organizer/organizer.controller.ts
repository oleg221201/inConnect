import {
  Controller,
  HttpStatus,
  Get,
  Request,
  UseInterceptors,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { OrganizerModel } from './organizer.model';
import { OrganizerService } from './organizer.service';
import { ClassSerializer } from '~common/interceptors/object-serializer.interceptor';
import { AccessTokenGuard, RoleGuard } from '~common/guards';
import { Roles } from '~common/decorators/roles.decorator';
import { UserModel, UserRole } from '../user.model';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { OrganizerWithUserDto } from './dto/organizer.dto';
import { DefaultMessageResponse } from '~common/responses';
import { UpdateOrganizerDto } from './dto/update.dto';

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
  showMe(@Request() request: RequestWithUser): {
    user: UserModel;
    organizer: OrganizerModel;
  } {
    const { organizer, ...user } = request.user;
    return { user, organizer };
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
  ): Promise<DefaultMessageResponse> {
    const { organizer } = request.user;

    await this.organizerService.update(organizer._id, updateOrganizerDto);

    return { message: 'Successfully updated organizer.' };
  }
}
