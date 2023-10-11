import React from 'react'

import Styles from './styles.scss'
import Template from '@/presentation/components/Template'

type DashboardProps = {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Template>
      <div className={Styles.app}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
        <span>Start your development from here</span>
      </div>
    </Template>
  )
}

export default Dashboard
