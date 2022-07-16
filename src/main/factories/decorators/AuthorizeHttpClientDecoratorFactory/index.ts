import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeLocalStorageAdapter } from '@/main/factories/cache/LocalStorageAdapter';
import { makeAxiosHttpClient } from '@/main/factories/http';
import { IHttpClient } from '@/data/protocols/http';

export const makeAuthorizeHttpClientDecorator = (): IHttpClient =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
