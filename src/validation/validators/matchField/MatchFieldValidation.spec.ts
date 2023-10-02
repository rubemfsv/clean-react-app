import { MatchFieldError } from '@/validation/errors';
import { MatchFieldValidation } from './MatchFieldValidation';
import faker from "faker";

const ONLY_DIGITS_REGEX = /^[0-9]*$/;
const CAPITAL_LETTERS_REGEX = /[A-Z]+/;

const makeSut = (
  fieldName: string,
  pattern: RegExp,
  ignoreCase?: boolean,
  message?: string
): MatchFieldValidation =>
  new MatchFieldValidation(fieldName, pattern, ignoreCase, message);

describe("MatchFieldValidation", () => {
  test("Should return error if match is invalid for Invalid Digit Regex", () => {
    const field = faker.database.column();
    const sut = makeSut(field, ONLY_DIGITS_REGEX);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });

    expect(error).toEqual(new MatchFieldError());
  });

  test("Should return falsy if match is valid for Invalid Digit Regex", () => {
    const field = faker.database.column();
    const sut = makeSut(field, ONLY_DIGITS_REGEX);
    const error = sut.validate({ [field]: faker.datatype.number() });

    expect(error).toBeFalsy();
  });

  test("Should return falsy if field does not exist in schema", () => {
    const sut = makeSut(faker.database.column(), ONLY_DIGITS_REGEX);
    const error = sut.validate({});

    expect(error).toBeFalsy();
  });

  test("Should return a custom error message if match is invalid", () => {
    const message = `Only uppercase letters are allowed!`;
    const field = faker.database.column();
    const sut = makeSut(field, CAPITAL_LETTERS_REGEX, false, message);
    const error = sut.validate({
      [field]: faker.random.alpha({ count: 5 }),
    });

    expect(error).toEqual(new MatchFieldError(message));
  });

  test("Should return falsy if match is valid for Capital Letters Regex", () => {
    const field = faker.database.column();
    const sut = makeSut(field, CAPITAL_LETTERS_REGEX, true);
    const error = sut.validate({ [field]: faker.random.alpha({ count: 5 }) });

    expect(error).toBeFalsy();
  });
});
