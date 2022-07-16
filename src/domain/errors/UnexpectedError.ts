export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message || 'Algo de errado aconteceu. Tente novamente mais tarde.');
    this.name = 'UnexpectedError';
  }
}
