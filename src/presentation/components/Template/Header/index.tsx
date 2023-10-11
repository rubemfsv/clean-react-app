import React from 'react'
import Styles from './styles.scss'
import Navigation from '../Navigation'

const Header: React.FC = () => {
  return (
    <div className={Styles.container}>

      <h1 className={Styles.logo}>My App</h1>

      <Navigation />
    </div>
  )
}

export default Header
