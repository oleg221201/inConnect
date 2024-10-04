import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid identifier');
    }

    return value;
  }
}
