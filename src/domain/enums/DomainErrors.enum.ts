/**
 * @enum {DomainErrorMessagesEnum} DomainErrorMessagesEnum - Definition of messages displayed in errors
 *
 * @arg {string} AccessDeniedError - Access denied message error
 * @arg {string} EmailInUseError - Email in use message error
 * @arg {string} InvalidCredentialsError - Invalid credentials message error
 * @arg {string} UnexpectedError - Unexpected message error
 *
 */
export enum DomainErrorMessagesEnum {
  AccessDeniedError = 'Access denied!',
  EmailInUseError = 'This email is already in use',
  InvalidCredentialsError = 'Invalid credentials',
  UnexpectedError = 'Something went wrong. Try again later.',
}

/**
 * @enum {DomainErrorNamesEnum} DomainErrorNamesEnum - Definition of messages names used in errors
 *
 * @arg {string} AccessDeniedError - Access denied name error
 * @arg {string} EmailInUseError - Email in use name error
 * @arg {string} InvalidCredentialsError - Invalid credentials name error
 * @arg {string} UnexpectedError - Unexpected name error
 */
export enum DomainErrorNamesEnum {
  AccessDeniedError = 'AccessDeniedError',
  EmailInUseError = 'EmailInUseError',
  InvalidCredentialsError = 'InvalidCredentialsError',
  UnexpectedError = 'UnexpectedError',
}
