import { Module } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';
import { FilesystemStorageService } from './storage.service';

@Module({
  providers: [FilesystemStorageService, CryptoService],
  exports: [FilesystemStorageService],
})
export class StorageModule {}
