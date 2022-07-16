import React, { useContext } from 'react';
import Spinner from './Spinner';
import Context from '@/presentation/hooks/form';

import Styles from './styles.scss';

const FormLoaderStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="mainError" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormLoaderStatus;
