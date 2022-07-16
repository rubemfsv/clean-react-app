import { AxiosHttpClient } from '@/infra/http/axiosHttpClient/AxiosHttpClient';

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
