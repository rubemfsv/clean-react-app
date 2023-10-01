export class MatchFieldError extends Error {
  constructor(message?: string) {
    super(message ?? `Value does not match pattern`);
    this.name = "MatchFieldError";
  }
}
