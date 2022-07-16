import { UnexpectedError } from '@/domain/errors';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/LocalStorageAdapter';
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '.';

jest.mock('@/infra/cache/LocalStorageAdapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
