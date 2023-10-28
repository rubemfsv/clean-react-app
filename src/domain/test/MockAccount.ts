import faker from 'faker'
import { type AccountModel } from '../models'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.random.word()
})
