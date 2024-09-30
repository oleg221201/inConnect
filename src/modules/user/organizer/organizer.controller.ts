import {
  Controller,
  HttpStatus,
  Get,
  Request,
  UseInterceptors,
  UseGuards,
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
}
