import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import faker from 'faker'
import { Login } from '@/presentation/pages'
import {
  AuthenticationSpy,
  ValidationStub,
  FormHelper
} from '@/presentation/test/'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/hooks'
import { type Authentication } from '@/domain/usecases'

interface SutTypes {
  authenticationSpy: AuthenticationSpy
  setCurrentAccoutMock: (account: Authentication.Model) => void
}

interface SutParams {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccoutMock = jest.fn()

  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccoutMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    authenticationSpy,
    setCurrentAccoutMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)

  const form = screen.getByTestId('loginForm')

  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login Component', () => {
  test('Should enable submit button if form is valid', () => {
    makeSystemUnderTest()
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.testButtonIsEnabled('loginButton')
  })

  test('Should show spinner on submit', async () => {
    makeSystemUnderTest()
    await simulateValidSubmit()
    FormHelper.testElementExists('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSystemUnderTest({ validationError })
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSystemUnderTest()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    FormHelper.testElementText('mainError', error.message)
    FormHelper.testChildCount('errorWrap', 1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccoutMock } = makeSystemUnderTest()
    await simulateValidSubmit()
    expect(setCurrentAccoutMock).toHaveBeenCalledWith(authenticationSpy.account)
  })

  test('Should redirect to / after Authentication on success', async () => {
    const { authenticationSpy, setCurrentAccoutMock } = makeSystemUnderTest()
    await simulateValidSubmit()
    expect(setCurrentAccoutMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signUpPage page', () => {
    makeSystemUnderTest()
    const signUp = screen.getByTestId('signUpPage')
    fireEvent.click(signUp)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
