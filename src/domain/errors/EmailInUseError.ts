import { DomainErrorMessagesEnum, DomainErrorNamesEnum } from '../enums';

export class EmailInUseError extends Error {
  constructor() {
    super(DomainErrorMessagesEnum.EmailInUseError);
    this.name = DomainErrorNamesEnum.EmailInUseError;
  }
}
