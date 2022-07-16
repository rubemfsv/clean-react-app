import React from 'react';

import Styles from './styles.scss';

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  'data-testid'?: string;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  return (
    <button
      type="submit"
      {...props}
      className={[Styles.buttonComponent, props.className].join(' ')}
    >
      {props.title}
    </button>
  );
};

export default Button;
