import React from 'react';
import Styles from './styles.scss';

const Field = (props) => {
  return <div className={Styles.field}>{props.children}</div>;
};

export default Field;
