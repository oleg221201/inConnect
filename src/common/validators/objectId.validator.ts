import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ name: 'ObjectIdValidator' })
export class ObjectIdValidator implements ValidatorConstraintInterface {
  validate(id: string): boolean {
    return ObjectId.isValid(id);
  }

  defaultMessage(): string {
    return 'Invalid identifier';
  }
}
