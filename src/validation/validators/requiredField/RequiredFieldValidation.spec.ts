import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './RequiredFieldValidation';
import faker from 'faker';

const makeSut = (fieldName: string): RequiredFieldValidation =>
  new RequiredFieldValidation(fieldName);

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.database.column() });
    expect(error).toBeFalsy();
  });
});
