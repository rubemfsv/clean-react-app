/**
 * @enum {DomainErrorMessagesEnum} DomainErrorMessagesEnum - Definition of messages displayed in errors
 *
 * @arg {string} InvalidFieldError - Invalid field message error
 * @arg {string} RequiredFieldError - Required field message error
 */
export enum DomainErrorMessagesEnum {
    InvalidFieldError = "Invalid value",
    RequiredFieldError = "Required field"
}

/**
 * @enum {DomainErrorNamesEnum} DomainErrorNamesEnum - Definition of messages names used in errors
 *
 * @arg {string} RequiredFieldError - Required field name error
 */
export enum DomainErrorNamesEnum {
    RequiredFieldError = "RequiredFieldError",
}