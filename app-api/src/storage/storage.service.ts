import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';
import { IStorageService } from './storage.interface';
import * as fs from 'node:fs';
import { ConfigKey } from 'src/config';

@Injectable()
export class FilesystemStorageService implements IStorageService<Buffer> {
  private storagePath: string;
  constructor(private readonly configService: ConfigService) {
    this.storagePath = this.configService.getOrThrow(
      ConfigKey.FILE_STORAGE_DIR,
    );
  }
  async readObject(path: string): Promise<Buffer> {
    const filepath = this.safePath(path);
    return new Promise((resolve, reject) =>
      fs.readFile(`${this.storagePath}${filepath}`, (err, data) => {
        if (err) reject(err);
        resolve(data);
      }),
    );
  }
  async saveObject(path: string, data: Buffer): Promise<unknown> {
    const filepath = this.safePath(path);
    return new Promise((resolve, reject) =>
      fs.writeFile(`${this.storagePath}${filepath}`, data, 'binary', (err) => {
        if (err) reject(err);
        resolve({ ok: true });
      }),
    );
  }

  private safePath(path: string): string {
    if (path.includes('../'))
      throw new Error(
        'Invalid file path, parent directory selection ".." is not allowed',
      );
    if (path.length === 0) throw new Error('Invalid file path');
    const filepath = path[0] !== '/' ? `/${path}` : path;
    return filepath;
  }
}
