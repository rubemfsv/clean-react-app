import { MatchFieldError } from "@/validation/errors/MatchFieldError";
import { MatchFieldValidation } from "./MatchFieldValidation";
import faker from "faker";

const ONLY_DIGITS_REGEX = /^[0-9]*$/;
const CAPITAL_LETTERS_REGEX = /[A-Z]+/;

const makeDigitsSut = (fieldName: string): MatchFieldValidation =>
  new MatchFieldValidation(fieldName, ONLY_DIGITS_REGEX);

const makeCapitalLettersSut = (
  fieldName: string,
  ignoreCase: boolean,
  message?: string
): MatchFieldValidation =>
  new MatchFieldValidation(
    fieldName,
    CAPITAL_LETTERS_REGEX,
    ignoreCase,
    message
  );

describe("MatchFieldValidation", () => {
  test("Should return error if valid is invalid", () => {
    const field = faker.database.column();
    const sut = makeDigitsSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });

    expect(error).toEqual(new MatchFieldError());
  });

  test("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeDigitsSut(field);
    const error = sut.validate({ [field]: faker.datatype.number() });

    expect(error).toBeFalsy();
  });

  test("Should return falsy if field does not exists in schema", () => {
    const sut = makeDigitsSut(faker.database.column());
    const error = sut.validate({});

    expect(error).toBeFalsy();
  });

  test("Should return custom message", () => {
    const message = `Only uppercase letters are allowed!`;
    const field = faker.database.column();
    const sut = makeCapitalLettersSut(field, false, message);
    const error = sut.validate({
      [field]: faker.random.alpha({ count: 5 }),
    });

    expect(error).toEqual(new MatchFieldError(message));
  });

  test("Should return falsy if case insensitive", () => {
    const field = faker.database.column();
    const sut = makeCapitalLettersSut(field, true);
    const error = sut.validate({ [field]: faker.random.alpha({ count: 5 }) });

    expect(error).toBeFalsy();
  });
});
