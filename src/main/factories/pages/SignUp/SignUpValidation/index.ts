import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().min(2).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(4).build(),
    ...ValidationBuilder.field('passwordConfirmation')
      .required()
      .sameAs('password')
      .build(),
  ]);
};
