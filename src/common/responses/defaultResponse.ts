import { ApiProperty } from '@nestjs/swagger';

export class DefaultMessageResponse {
  @ApiProperty()
  message: string;
}
