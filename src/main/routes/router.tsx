import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeDashboard, makeSignup } from '@/main/factories/pages'
import PrivateRoute from '@/presentation/Routes/private.routes'
import { ApiContext } from '@/presentation/hooks'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '../adapters/CurrentAccountAdapter'

import '@/presentation/styles/global.scss'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={makeLogin} />
          <Route exact path="/signup" component={makeSignup} />
          <Route exact path="/" component={makeDashboard} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
