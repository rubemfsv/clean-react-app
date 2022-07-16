import { InvalidFieldError } from '@/validation/errors';
import { IFieldValidation } from '@/validation/protocols';

export class MinLengthValidation implements IFieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    return input[this.field]?.length <= this.minLength ? new InvalidFieldError() : null;
  }
}
