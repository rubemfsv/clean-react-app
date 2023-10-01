import { InvalidFieldError } from '@/validation/errors';
import { IFieldValidation } from '@/validation/protocols';

export class MinLengthValidation implements IFieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    const fieldLength = input[this.field]?.length;
    return fieldLength && fieldLength < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
