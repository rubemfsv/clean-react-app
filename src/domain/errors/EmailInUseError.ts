export class EmailInUseError extends Error {
  constructor() {
    super('This email is already in use')
    this.name = 'EmailInUseError'
  }
}
