import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  EmailFieldValidation,
  MinLengthValidation,
  MatchFieldValidation,
  MaxLengthValidation,
  FileTypeValidation,
} from '@/validation/validators'
import { ValidationBuilder } from './ValidationBuilder'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation ', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation ', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailFieldValidation(field)])
  })

  test('Should return MinLengthValidation ', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return MaxLengthValidation ', () => {
    const field = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field).max(length).build()
    expect(validations).toEqual([new MaxLengthValidation(field, length)])
  })

  test('Should return CompareFieldsValidation ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompare)
      .build()
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ])
  })

  test('Should return MatchFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field)
      .match(/^[0-9]*$/, false)
      .build()

    expect(validations).toEqual([
      new MatchFieldValidation(field, /^[0-9]*$/, false),
    ])
  })

  test('Should return FileTypeValidation', () => {
    const field = faker.database.column();
    const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'txt'];
    const validations = ValidationBuilder.field(field)
      .fileType(allowedFileExtensions)
      .build();

    expect(validations).toEqual([new FileTypeValidation(field, allowedFileExtensions)]);
  });

  test('Should return a list of validations ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const minLength = faker.datatype.number()
    const maxLength = minLength + faker.datatype.number()
    const DIGITS_REGEX = /^[0-9]*$/
    const validations = ValidationBuilder.field(field)
      .required()
      .min(minLength)
      .max(maxLength)
      .sameAs(fieldToCompare)
      .email()
      .match(DIGITS_REGEX)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new MaxLengthValidation(field, maxLength),
      new CompareFieldsValidation(field, fieldToCompare),
      new EmailFieldValidation(field),
      new MatchFieldValidation(field, DIGITS_REGEX, false),
    ])
  })
})
