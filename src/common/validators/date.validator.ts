import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'IsFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: string): boolean {
    return dayjs(date).isAfter(dayjs());
  }

  defaultMessage(): string {
    return 'Date must be in the future';
  }
}

@ValidatorConstraint({ name: 'IsEqualOrAfterFromDate', async: false })
export class IsAfterFromDateConstraint implements ValidatorConstraintInterface {
  validate(to: string, args: ValidationArguments): boolean {
    const from = (args.object as any).from;
    const dayjsFrom = dayjs(from);
    const dayjsTo = dayjs(to);
    return dayjsTo.isAfter(dayjsFrom) || dayjsTo.isSame(dayjsFrom);
  }

  defaultMessage(): string {
    return '"to" date must be equal or after the "from" date';
  }
}
