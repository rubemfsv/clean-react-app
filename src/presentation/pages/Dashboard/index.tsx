import React from 'react'

import Styles from './styles.scss'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className={Styles.container}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
      <span>Start your development from here</span>
    </div>
  )
}

export default Dashboard
