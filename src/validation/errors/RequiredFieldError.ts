export class RequiredFieldError extends Error {
  constructor() {
    super('Required field');
    this.name = 'RequiredFieldError';
  }
}
