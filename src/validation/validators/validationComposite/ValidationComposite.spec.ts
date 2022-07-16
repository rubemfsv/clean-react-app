import { FieldValidationSpy } from '@/validation/test/MockFieldValidation';
import { ValidationComposite } from './ValidationComposite';
import faker from 'faker';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const first_error_message = faker.random.words();
    const second_error_message = faker.random.words();
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    fieldValidationsSpy[0].error = new Error(first_error_message);
    fieldValidationsSpy[1].error = new Error(second_error_message);
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBe(error);
  });

  test('Should return falsy if there is no error', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBeFalsy();
  });
});
