export interface IStorageService<T> {
  saveObject(path: string, data: Buffer): Promise<unknown>;
  readObject(path: string): Promise<T>;
}
