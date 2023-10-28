import { type AccountModel } from '@/domain/models/'

export interface IAuthentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export interface Params {
    email: string
    password: string
  }

  export type Model = AccountModel
}
