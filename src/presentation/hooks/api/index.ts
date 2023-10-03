import { AccountModel } from '@/domain/models'
import { createContext } from 'react'

type ApiProps = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export default createContext<ApiProps>(null)
