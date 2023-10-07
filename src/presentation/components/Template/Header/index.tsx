import React from 'react'
import Styles from './styles.scss'
import Navigation from '../Navigation'

const Header: React.FC = () => {
  return (
    <div className={Styles.Container}>
      <img
        className={Styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
      />

      <Navigation />
    </div>
  )
}

export default Header
