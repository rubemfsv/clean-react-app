import React from "react";
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history';
import { fireEvent,render,waitFor,screen } from "@testing-library/react";
import faker from 'faker'
import { SignUp } from '@/presentation/pages'
import {AuthenticationSpy, ValidationStub, FormHelper} from '@/presentation/test/'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/hooks'
import { Authentication } from '@/domain/usecases'
import { type } from "os";

type SutTypes = {
    authenticationSpy: AuthenticationSpy
    setCurrentAccoutMock: (account: Authentication.Model) => void
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({initialEntries: ['/signup']})

const makeSystemUnderTest = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const setCurrentAccoutMock = jest.fn()
  
    validationStub.errorMessage = params?.validationError
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccoutMock }}>
        <Router history={history}>
          <SignUp validation={validationStub} authentication={authenticationSpy} />
        </Router>
      </ApiContext.Provider>
    )
  
    return {
      authenticationSpy,
      setCurrentAccoutMock,
    }
  }

const simulateValidSubmit = async(
    email = faker.internet.email(),
    name = faker.internet.userName(),
    password = faker.internet.password(),
    confirmPassword = faker.internet.password()
): Promise<void> => {
    FormHelper.populateField('name',name);
    FormHelper.populateField('email',email);
    FormHelper.populateField('password',password);
    FormHelper.populateField('confirm_password',confirmPassword);

    const form = screen.getByTestId('signUpForm') as HTMLButtonElement

    fireEvent.submit(form)

    await waitFor(()=> form)
}

describe('SignUp Component',()=>{
  test('Should enable submit button if form is valid',()=>{
    makeSystemUnderTest()
    FormHelper.populateField('name')
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    FormHelper.populateField('confirm_password')
    FormHelper.testButtonIsEnabled('signUpButton')
  })

  test('Should show spinner on submit',async ()=>{
    makeSystemUnderTest()
    await simulateValidSubmit()
    FormHelper.testElementExists('spinner')
  })

  test('Should call authentication with correct values',async()=>{
    const {authenticationSpy} = makeSystemUnderTest()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.internet.userName()
    const confirm_password = faker.internet.password()
    await simulateValidSubmit(email,password,name,confirm_password)
    expect(authenticationSpy.params).toEqual({email,password,name,confirm_password})
  })

  test('Should call Authentication only once',async()=>{
    const {authenticationSpy} = makeSystemUnderTest()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call authentication if form is invalid',async()=>{
    const validationError = faker.random.words()
    const {authenticationSpy} = makeSystemUnderTest()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if authentication fails',async()=>{
    const {authenticationSpy} = makeSystemUnderTest()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy,'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    FormHelper.testElementText('mainError', error.message)
    FormHelper.testChildCount('errorWrap', 1)
  })

  test('Should redirect to / after Authentication on success', async () => {
    const { authenticationSpy, setCurrentAccoutMock } = makeSystemUnderTest()
    await simulateValidSubmit()
    expect(setCurrentAccoutMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to LogIn Page',()=>{
    makeSystemUnderTest()
    const signIn = screen.getByTestId('LogIn Page')
    fireEvent.click(signIn)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/login')
  })
})