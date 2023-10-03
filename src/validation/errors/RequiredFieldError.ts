import { DomainErrorMessagesEnum, DomainErrorNamesEnum } from "../enums";

export class RequiredFieldError extends Error {
  constructor() {
    super(DomainErrorMessagesEnum.RequiredFieldError);
    this.name = DomainErrorNamesEnum.RequiredFieldError ;
  }
}
