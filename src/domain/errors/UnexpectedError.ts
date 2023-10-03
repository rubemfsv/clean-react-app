import { DomainErrorMessagesEnum, DomainErrorNamesEnum } from '../enums'

export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message || DomainErrorMessagesEnum.UnexpectedError)
    this.name = DomainErrorNamesEnum.UnexpectedError
  }
}
