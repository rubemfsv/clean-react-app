import { InvalidFieldError } from '@/validation/errors';
import { IFieldValidation } from '@/validation/protocols';

export class CompareFieldsValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.valueToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
