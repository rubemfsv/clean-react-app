import { RemoteAddAccount, RemoteAddAccountNamespace } from './RemoteAddAccount'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http/'
import { mockAddAccountModel, mockAddAccount } from '@/domain/test/'
import { EmailInUseError, UnexpectedError } from '@/domain/errors/'
import faker from 'faker'

type SutTypes = {
  systemUnderTest: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccountNamespace.Model>
}

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccountNamespace.Model>()
  const systemUnderTest = new RemoteAddAccount(url, httpClientSpy)

  return {
    systemUnderTest,
    httpClientSpy,
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url)
    const addAccountParams = mockAddAccount()

    await systemUnderTest.add(addAccountParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }
    const promise = systemUnderTest.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = systemUnderTest.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = systemUnderTest.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const promise = systemUnderTest.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
