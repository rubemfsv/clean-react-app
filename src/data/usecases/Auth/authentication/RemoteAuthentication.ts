import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors';
import { IAuthentication, Authentication } from '@/domain/usecases';

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpClient<RemoteAuthenticationamespace.Model>
  ) {}

  async auth(
    params: Authentication.Params
  ): Promise<RemoteAuthenticationamespace.Model> {
    const httpResponse = await this.httpPostClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthenticationamespace {
  export type Model = Authentication.Model;
}
