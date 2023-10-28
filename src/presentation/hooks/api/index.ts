import { createContext } from 'react'
import { type AccountModel } from '@/domain/models'

interface ApiProps {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export default createContext<ApiProps>(null)
