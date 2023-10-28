import { DomainErrorMessagesEnum, DomainErrorNamesEnum } from '../enums'

export class InvalidCredentialsError extends Error {
  constructor () {
    super(DomainErrorMessagesEnum.InvalidCredentialsError)
    this.name = DomainErrorNamesEnum.InvalidCredentialsError
  }
}
