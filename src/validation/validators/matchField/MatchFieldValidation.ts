import { MatchFieldError } from '@/validation/errors'
import { type IFieldValidation } from '@/validation/protocols'

export class MatchFieldValidation implements IFieldValidation {
  constructor (
    readonly field: string,
    private readonly pattern: RegExp,
    private readonly ignoreCase?: boolean,
    private readonly message?: string
  ) {}

  validate (input: object): Error {
    const combinedRegex = new RegExp(
      this.pattern.source,
      this.ignoreCase ? 'i' : ''
    )

    return !input[this.field] || combinedRegex.test(input[this.field])
      ? null
      : new MatchFieldError(this.message)
  }
}
