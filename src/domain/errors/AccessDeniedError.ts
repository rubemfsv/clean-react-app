import { DomainErrorMessagesEnum, DomainErrorNamesEnum } from '../enums'

export class AccessDeniedError extends Error {
  constructor() {
    super(DomainErrorMessagesEnum.AccessDeniedError)
    this.name = DomainErrorNamesEnum.AccessDeniedError
  }
}
