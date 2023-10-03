import { ValidationErrorMessagesEnum } from '../enums';

export class InvalidFieldError extends Error {
  constructor() {
    super(ValidationErrorMessagesEnum.InvalidFieldError);
  }
}