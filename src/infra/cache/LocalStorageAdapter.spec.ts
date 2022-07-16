import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './LocalStorageAdapter';
import faker from 'faker';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage.setItems with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('Should call localStorage.removeItems with values is null', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);
    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(obj).toEqual(value);
  });
});
