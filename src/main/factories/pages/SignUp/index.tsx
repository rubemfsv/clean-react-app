import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeRemoteAddAccount } from '@/main/factories/usecases';
import { makeSignUpValidation } from './SignUpValidation';

const makeSignUp: React.FC = () => {
  const addAccountComposite = makeRemoteAddAccount();
  const validationComposite = makeSignUpValidation();

  return (
    <SignUp addAccount={addAccountComposite} validation={validationComposite} />
  );
};

export default makeSignUp;
