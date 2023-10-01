import { InvalidFieldError } from '@/validation/errors';
import { IFieldValidation } from '@/validation/protocols';

export class MaxLengthValidation implements IFieldValidation {
  constructor(readonly field: string, private readonly maxLength: number) {}

  validate(input: object): Error {
    const fieldLength = input[this.field]?.length;
    return fieldLength && fieldLength > this.maxLength
      ? new InvalidFieldError()
      : null;
  }
}
