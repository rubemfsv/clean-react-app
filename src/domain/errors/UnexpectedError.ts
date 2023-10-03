export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message || 'Something went wrong. Try again later.')
    this.name = 'UnexpectedError'
  }
}
