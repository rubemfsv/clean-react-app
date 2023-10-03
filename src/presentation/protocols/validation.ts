export interface IValidation {
  validate: (fieldName: string, input: object) => string
}
