import { InvalidFileTypeError } from '@/validation/errors'
import { type IFieldValidation } from '@/validation/protocols'

export class FileTypeValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly allowedFileExtensions: string[]
  ) {}

  private getFileExtension (fileName: string): string {
    const ext = fileName.lastIndexOf('.')
    if (ext === -1) {
      return '' // No extension found
    }
    return fileName.slice(ext + 1).toLowerCase()
  }

  validate (input: object): Error {
    const fileExtension = this.getFileExtension(
      (input[this.field] || '').toLowerCase()
    )
    const isAllowed = this.allowedFileExtensions.find(
      (ext) => ext.toLowerCase() === fileExtension
    )
    return fileExtension && isAllowed ? null : new InvalidFileTypeError()
  }
}
