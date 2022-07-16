import React from 'react';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/';
import { makeLoginValidation } from './LoginValidation';

const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidation();

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
};

export default makeLogin;
