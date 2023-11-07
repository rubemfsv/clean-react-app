import React from 'react'
import Styles from './styles.scss'
import Header from './Header'

type TemplateProps = {
  children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className={Styles.container}>
      <Header />
      {children}
    </div>
  )
}

export default Template
