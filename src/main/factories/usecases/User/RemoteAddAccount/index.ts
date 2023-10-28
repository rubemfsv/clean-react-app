import { RemoteAddAccount } from '@/data/usecases/'
import { type IAddAccount } from '@/domain/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddAccount = (): IAddAccount => {
  const remoteAddAccount = new RemoteAddAccount(
    makeApiUrl('/signup'),
    makeAxiosHttpClient()
  )

  return remoteAddAccount
}
