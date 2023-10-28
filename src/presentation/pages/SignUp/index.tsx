import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Context from '@/presentation/hooks/form'
import { Button, Input, FormLoaderStatus } from '@/presentation/components/'
import { type IValidation } from '@/presentation/protocols/validation'
import { type IAddAccount } from '@/domain/usecases'
import Styles from './styles.scss'
import { ApiContext } from '@/presentation/hooks'

interface SignUpProps {
  validation: IValidation
  addAccount: IAddAccount
}

const SignUp: React.FC<SignUpProps> = ({
  validation,
  addAccount
}: SignUpProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    emailError: '',
    nameError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, name, password, passwordConfirmation } = state
    const formData = {
      email,
      name,
      password,
      passwordConfirmation
    }
    const emailError = validation.validate('email', formData)
    const nameError = validation.validate('name', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )

    setState({
      ...state,
      emailError,
      nameError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!emailError ||
        !!nameError ||
        !!passwordError ||
        !!passwordConfirmationError
    })
  }, [state.email, state.name, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.sigup}>
      <div className={Styles.content}>
        <Context.Provider value={{ state, setState }}>
          <form
            className={Styles.form}
            data-testid="forgotPasswordForm"
            onSubmit={handleSubmit}
          >
            <div className={Styles.invertedMold} />
            <h1 className={Styles.title}>Create account</h1>
            <Input
              autoComplete="off"
              title="Enter your name"
              type="name"
              name="name"
            />
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
            <Input
              autoComplete="off"
              title="Enter your password again"
              type="password"
              name="passwordConfirmation"
              minLength={4}
            />

            <div className={Styles.buttonsContainer}>
              <Button
                data-testid="forgotPasswordButton"
                type="submit"
                title="Create"
                disabled={state.isFormInvalid}
                className={Styles.submitBtn}
              />

              <Link
                data-testid="forgetPasswordPage"
                to="/login"
                className={Styles.goBack}
              >
                Back
              </Link>
            </div>

            <FormLoaderStatus />
          </form>
        </Context.Provider>
      </div>
    </div>
  )
}

export default SignUp
