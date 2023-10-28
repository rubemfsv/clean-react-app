import { type RemoteAuthenticationamespace } from '@/data/usecases/'
import { mockAccountModel } from '@/domain/test'
import { type Authentication, type IAuthentication } from '@/domain/usecases'

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel()
  params: Authentication.Params
  callsCount = 0

  async auth (
    params: Authentication.Params
  ): Promise<RemoteAuthenticationamespace.Model> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.account)
  }
}
