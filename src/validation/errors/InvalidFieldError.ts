import { DomainErrorMessagesEnum } from "../enums";

export class InvalidFieldError extends Error {
  constructor() {
    super(DomainErrorMessagesEnum.InvalidFieldError);
  }
}
