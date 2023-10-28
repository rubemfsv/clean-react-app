import faker from 'faker'
import { MinLengthValidation } from './MinLengthValidation'
import { InvalidFieldError } from '@/validation/errors'

const minLength = faker.datatype.number()

const makeSut = (fieldName: string): MinLengthValidation =>
  new MinLengthValidation(fieldName, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is shorter than minLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength - 1)
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is equal to minLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength)
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if value is longer than minLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength + 1)
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(minLength - 1)
    })
    expect(error).toBeFalsy()
  })
})
