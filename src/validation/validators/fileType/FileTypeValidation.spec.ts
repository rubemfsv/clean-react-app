import faker from 'faker'
import { FileTypeValidation } from './FileTypeValidation'
import { InvalidFileTypeError } from '@/validation/errors'

const field = faker.database.column()
const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'txt']

const makeSut = (fieldName: string): FileTypeValidation =>
  new FileTypeValidation(fieldName, allowedFileExtensions)

describe('FileTypeValidation', () => {
  test('Should return error if file extension is not allowed', () => {
    const sut = makeSut(field)
    const error = sut.validate({ [field]: 'document.exe' })
    expect(error).toEqual(new InvalidFileTypeError())
  })

  test('Should return falsy if file extension is allowed', () => {
    const sut = makeSut(field)
    const error = sut.validate({ [field]: 'document.pdf' })
    expect(error).toBeFalsy()
  })

  test('Should return error if field does not exist in the input', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: 'file.txt' })
    expect(error).toEqual(new InvalidFileTypeError())
  })

  test('Should return error if input has no file extension', () => {
    const sut = makeSut(field)
    const error = sut.validate({ [field]: 'fileWithoutExtension' })
    expect(error).toEqual(new InvalidFileTypeError())
  })
})
