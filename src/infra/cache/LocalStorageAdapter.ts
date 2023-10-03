import { IGetStorage, ISetStorage } from '@/data/protocols/cache/'

export class LocalStorageAdapter implements ISetStorage, IGetStorage {
  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
