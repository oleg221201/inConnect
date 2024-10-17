import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  IsAfterFromDateConstraint,
  IsFutureDateConstraint,
} from '~common/validators/date.validator';

export const IsFutureDate = (validationOptions?: ValidationOptions) => {
  return function (target: object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
};

export const IsEqualOrAfterFromDate = (
  validationOptions?: ValidationOptions,
) => {
  return function (target: object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAfterFromDateConstraint,
    });
  };
};
