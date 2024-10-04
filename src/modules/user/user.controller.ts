import {
  Controller,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
  Query,
  Get,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { DefaultMessageResponse } from '~common/responses';
import { UseSwagger } from '~common/decorators/swagger.decorator';
import { UserRole } from './user.model';
import { SpeakerService } from './speaker/speaker.service';
import { OrganizerService } from './organizer/organizer.service';
import { UploadQueryDto, UploadUrlDto } from '~common/dto/upload.dto';
import { RequestWithUser } from '~common/interfaces/auth.interface';
import { generateUploadUrl } from 'src/services/aws/s3';
import { AccessTokenGuard } from '~common/guards';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ProfilePictureDto } from './dto/profile-picture.dto';

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
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException(i18n.t('error.USER.EMAIL_TAKEN'));
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
  @Get('/upload-profile-picture')
  async getUploadUrl(
    @Request() request: RequestWithUser,
    @Query() query: UploadQueryDto,
  ): Promise<UploadUrlDto> {
    const { _id: userId } = request.user;
    const { mime } = query;
    const fileName = `profile-photo/${userId}`;

    const url = await generateUploadUrl(fileName, mime);

    return { url };
  }

  @UseSwagger({
    operation: { summary: 'Update profile picture' },
    response: {
      description: 'Successfully updated profile picture',
      type: DefaultMessageResponse,
      status: HttpStatus.OK,
    },
    auth: true,
    possibleCodes: [HttpStatus.BAD_REQUEST],
  })
  @UseGuards(AccessTokenGuard)
  @Put('/profile-picture')
  async saveProfilePicture(
    @Request() request: RequestWithUser,
    @Body() profilePictureDto: ProfilePictureDto,
    @I18n() i18n: I18nContext,
  ): Promise<DefaultMessageResponse> {
    const { _id: userId } = request.user;
    const { profilePicture } = profilePictureDto;

    await this.userService.updateById(userId, { profilePicture });

    return { message: i18n.t('message.SUCCESS_UPDATE') };
  }
}
