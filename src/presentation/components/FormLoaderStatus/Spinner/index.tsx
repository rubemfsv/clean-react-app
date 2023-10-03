import React from 'react'

import Styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
  'data-testid'?: string
}

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div
      data-testid="spinner"
      {...props}
      className={[Styles.spinner, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
