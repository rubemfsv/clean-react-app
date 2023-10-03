import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiContext, FormContext } from '@/presentation/hooks'
import { IValidation } from '@/presentation/protocols/validation'
import { IAuthentication } from '@/domain/usecases'
import {  FormLoaderStatus } from '@/presentation/components/'
import {Button, Input} from '@/ui/components'
import Styles from './styles.scss'

type LoginProps = {
  validation: IValidation
  authentication: IAuthentication
}

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
}: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      })
    }
  }

  return (
    <div className={Styles.login}>
      <div className={Styles.content}>
        <FormContext.Provider value={{ state, setState }}>
          <form
            data-testid="loginForm"
            className={Styles.form}
            onSubmit={handleSubmit}
          >
            <h1 className={Styles.loginTitle}>Login with your account</h1>

            <Input
              autoComplete="off"
              title="Enter your e-mail"
              type="email"
              name="email"
            />

            <Input
              autoComplete="off"
              title="Enter your password"
              type="password"
              name="password"
              minLength={4}
            />
            <div className={Styles.buttonsContainer}>
              <Button
                className={Styles.loginBtn}
                type="submit"
                disabled={state.isFormInvalid}
                title="Login"
                data-testid="loginButton"
              />
              <Link
                data-testid="signUpPage"
                to="/signup"
                className={Styles.forgetPassword}
              >
                Create account
              </Link>
            </div>
            <FormLoaderStatus />
          </form>
        </FormContext.Provider>
      </div>
    </div>
  )
}

export default Login
