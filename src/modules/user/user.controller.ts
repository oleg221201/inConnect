import {
  Controller,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { DefaultMessageResponse } from '~common/responses';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { UserRole } from './user.model';
import { SpeakerService } from './speaker/speaker.service';
import { OrganizerService } from './organizer/organizer.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly speakerService: SpeakerService,
    private readonly organizerService: OrganizerService,
  ) {}

  @UseSwagger({
    operation: { summary: 'Create user' },
    response: {
      description: 'Successfully created user',
      type: DefaultMessageResponse,
      status: HttpStatus.CREATED,
    },
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<DefaultMessageResponse> {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.userService.create(createUserDto);

    switch (createUserDto.role) {
      case UserRole.organizer:
        await this.organizerService.create(newUser._id);
      case UserRole.speaker:
        await this.speakerService.create(newUser._id);
    }

    return { message: `The ${createUserDto.role} was successfully created.` };
  }
}
