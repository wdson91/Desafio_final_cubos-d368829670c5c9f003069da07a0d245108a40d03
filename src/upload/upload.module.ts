import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: '../../uploads', // Define o diretório de armazenamento dos arquivos
  }),],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
