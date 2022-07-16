import {
  RemoteAuthentication,
  RemoteAuthenticationamespace,
} from './RemoteAuthentication';
import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http/';
import { mockAuthenticationModel, mockAuthentication } from '@/domain/test/';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors/';
import faker from 'faker';

type SutTypes = {
  systemUnderTest: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthenticationamespace.Model>;
};

const makeSystemUnderTest = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthenticationamespace.Model>();
  const systemUnderTest = new RemoteAuthentication(url, httpClientSpy);

  return {
    systemUnderTest,
    httpClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest(url);
    const authenticationParams = mockAuthentication();
    await systemUnderTest.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    const httpResult = mockAuthenticationModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const account = await systemUnderTest.auth(mockAuthentication());

    expect(account).toEqual(httpResult);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = systemUnderTest.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = systemUnderTest.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = systemUnderTest.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { systemUnderTest, httpClientSpy } = makeSystemUnderTest();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = systemUnderTest.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
