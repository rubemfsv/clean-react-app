import { IGetStorage } from '../protocols/cache';
export class GetStorageSpy implements IGetStorage {
  key: string;
  value: any;
  get(key: string): any {
    this.key = key;

    return this.value;
  }
}
