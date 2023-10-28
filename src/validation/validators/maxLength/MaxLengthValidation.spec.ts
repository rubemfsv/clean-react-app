import faker from 'faker'
import { MaxLengthValidation } from './MaxLengthValidation'
import { InvalidFieldError } from '@/validation/errors'

const maxLength = faker.datatype.number()

const makeSut = (fieldName: string): MaxLengthValidation =>
  new MaxLengthValidation(fieldName, maxLength)

describe('MaxLengthValidation', () => {
  test('Should return error if value is longer than maxLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(maxLength + 1)
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is equal to maxLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(maxLength)
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if value is shorter than maxLength', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(maxLength - 1)
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(maxLength - 1)
    })
    expect(error).toBeFalsy()
  })
})
