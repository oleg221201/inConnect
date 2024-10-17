import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectIdValidator } from '~common/validators/objectId.validator';
import { IsFutureDate } from '~common/decorators/date.decorator';

export class CreateRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2800)
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsFutureDate()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(ObjectIdValidator)
  lecturerId: string;
}
