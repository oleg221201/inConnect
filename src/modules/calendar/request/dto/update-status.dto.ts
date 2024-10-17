import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '../request.model';

export class UpdateRequestStatusDto {
  @ApiProperty()
  @IsString()
  @IsEnum([RequestStatus.APPROVER, RequestStatus.REJECTED])
  @IsNotEmpty()
  status: RequestStatus;
}
