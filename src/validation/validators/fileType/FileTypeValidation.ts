import { InvalidFileTypeError } from '@/validation/errors'
import { IFieldValidation } from '@/validation/protocols'

export class FileTypeValidation implements IFieldValidation {
  constructor(
    readonly field: string,
    private readonly allowedFileExtensions: string[]
  ) {}

  private getFileExtension(fileName: string): string {
    const parts = fileName?.split('.');
    if (parts?.length === 1 || (parts?.[0] === '' && parts?.length === 2)) {
      return ''; // No extension found
    }
    return parts?.pop()!.toLowerCase();
  }

  validate(input: object): Error {
    const fileExtension = this.getFileExtension(input[this.field]?.toLowerCase());
    const allowedExtensions = this.allowedFileExtensions.map((ext) => ext.toLowerCase());
    return !fileExtension || !allowedExtensions.includes(fileExtension)
      ? new InvalidFileTypeError()
      : null
  }
}
