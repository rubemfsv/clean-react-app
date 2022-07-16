import { IHttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { IGetStorage } from '@/data/protocols/cache/getStorage';

export class AuthorizeHttpClientDecorator implements IHttpClient {
  constructor(
    private readonly getStorage: IGetStorage,
    private readonly httpClient: IHttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: 'Bearer ' + account.accessToken,
        }),
      });
    }
    const httpResponse = await this.httpClient.request(data);
    return httpResponse;
  }
}
