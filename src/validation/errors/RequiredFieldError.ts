import { ValidationErrorMessagesEnum, ValidationErrorNamesEnum } from '../enums'

export class RequiredFieldError extends Error {
  constructor () {
    super(ValidationErrorMessagesEnum.RequiredFieldError)
    this.name = ValidationErrorNamesEnum.RequiredFieldError
  }
}
