import { IHttpClient, HttpStatusCode } from '@/data/protocols/http';
import { AddAccount, IAddAccount } from '@/domain/usecases';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<RemoteAddAccountNamespace.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccountNamespace {
  export type Model = AddAccount.Model;
}
