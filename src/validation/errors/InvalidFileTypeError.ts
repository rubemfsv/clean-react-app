import { ValidationErrorMessagesEnum, ValidationErrorNamesEnum } from '../enums'

export class InvalidFileTypeError extends Error {
  constructor() {
    super(ValidationErrorMessagesEnum.InvalidFileTypeError)
    this.name = ValidationErrorNamesEnum.InvalidFileTypeError
  }
}
