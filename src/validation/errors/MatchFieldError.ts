import { ValidationErrorMessagesEnum, ValidationErrorNamesEnum } from '../enums'

export class MatchFieldError extends Error {
  constructor(message?: string) {
    super(message || ValidationErrorMessagesEnum.MatchFieldError)
    this.name = ValidationErrorNamesEnum.MatchFieldError
  }
}
