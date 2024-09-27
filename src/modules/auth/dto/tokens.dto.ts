import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/modules/user/user.model';

export class TokensResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  role: UserRole;
}
