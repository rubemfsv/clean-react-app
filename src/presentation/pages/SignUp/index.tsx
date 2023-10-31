import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Context from '@/presentation/hooks/form'
import { Button, Input, FormLoaderStatus } from '@/presentation/components/'
import { IValidation } from '@/presentation/protocols/validation'
import { IAddAccount } from '@/domain/usecases'
import Styles from './styles.scss'
import { ApiContext } from '@/presentation/hooks'

type SignUpProps = {
  validation: IValidation
  addAccount: IAddAccount
}

const SignUp: React.FC<SignUpProps> = ({
  validation,
  addAccount,
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
    mainError: '',
  })

  const [strength, setStrength] = useState('');
  const evaluatePasswordStrength = (value) => {

    //Conditions for password strength
    const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$");
    const mediumRegex = new RegExp("^(?=.{6,}).*$");

    //logic
    if(value.length<4){
      setStrength('NotEnoughElements');
    } else if (strongRegex.test(value)) {
      setStrength(`Strong`);
    } else if (mediumRegex.test(value)) {
      setStrength('Medium');
    } else {
      setStrength('Weak');
    }
  };

  useEffect(() => {
    const { email, name, password, passwordConfirmation } = state
    const formData = {
      email,
      name,
      password,
      passwordConfirmation,
    }
    const emailError = validation.validate('email', formData)
    const nameError = validation.validate('name', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )
    evaluatePasswordStrength(password);

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
        !!passwordConfirmationError,
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
        isLoading: true,
      })
      let account = await addAccount.add({
        email: state.email,
        name: state.name,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
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
            <Input className={Styles.signUpPassword}
              autoComplete="off"
              title="Enter your password"
              type="password"
              name="password"
              minLength={4}
            />
            {(strength=="Strong") ? (
              <div>
                <div className={Styles.signUpPasswordStrongScript}><strong className={Styles.signUpPasswordforBlack}>Password Strength:</strong>Strong</div>
                <div className={Styles.signUpPasswordStrong}></div>
              </div>
            ) : null}
            {(strength=="Medium") ? (
              <div>
                <div className={Styles.signUpPasswordMediumScript}><strong className={Styles.signUpPasswordforBlack}>Password Strength:</strong>Medium</div>
                <div className={Styles.signUpPasswordMedium}></div>
              </div>
            ) : null}
            {(strength=="Weak") ? (
              <div>
                <div className={Styles.signUpPasswordWeakScript}><strong className={Styles.signUpPasswordforBlack}>Password Strength:</strong>Weak</div>
                <div className={Styles.signUpPasswordWeak}></div>
              </div>
            ) : null}
            {(strength=="NotEnoughElements") ? (
              <div>
                <div className={Styles.signUpPasswordBlankScript}><strong className={Styles.signUpPasswordforBlack}>Password Strength Validator</strong></div>
                <div className={Styles.signUpPasswordBlank}></div>
              </div>
            ) : null}


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
