export interface IFieldValidation {
  field: string
  validate: (input: object) => Error
}
