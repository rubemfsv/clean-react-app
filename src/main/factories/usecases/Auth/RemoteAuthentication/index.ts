import { RemoteAuthentication } from '@/data/usecases/';
import { IAuthentication } from '@/domain/usecases';
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http';

export const makeRemoteAuthentication = (): IAuthentication => {
  const remoteAuthentication = new RemoteAuthentication(
    makeApiUrl('/login'),
    makeAxiosHttpClient()
  );

  return remoteAuthentication;
};
