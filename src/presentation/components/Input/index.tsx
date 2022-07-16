import React, { useContext, useState } from 'react';
import Context from '@/presentation/hooks/form';

import Styles from './styles.scss';

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title?: string;
  hideStatus?: boolean;
}

const Input: React.FC<IInputProps> = (props: IInputProps) => {
  const { state, setState } = useContext(Context);
  const stateName = `${props.name}Error`;
  const error = state[stateName];
  const [isActiveFocus, setIsActiveFocus] = useState(false);

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
    setIsActiveFocus(true);
  };

  const handleInputChange = (
    event: React.FocusEvent<HTMLInputElement>
  ): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className={Styles.InputWrapper}>
      <input
        {...props}
        data-testid={`${props.name}`}
        readOnly
        onFocus={enableInput}
        onChange={handleInputChange}
        onBlur={() => setIsActiveFocus(false)}
        placeholder="&nbsp;"
        className={Styles.Input}
      />
      <label className={Styles.Label}>{props.title}</label>
    </div>
  );
};

export default Input;
