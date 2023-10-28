import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeSignUpValidation } from '.'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().min(2).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(4).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build()
      ])
    )
  })
})
