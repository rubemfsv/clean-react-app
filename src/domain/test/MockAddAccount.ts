import { AddAccount, IAddAccount } from '@/domain/usecases';
import faker from 'faker';
import { mockAccountModel } from './MockAccount';

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.lastName(),
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password,
  };
};

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel();

export class AddAccountSpy implements IAddAccount {
  account = mockAddAccountModel();
  params: AddAccount.Params;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
