import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('arquivo')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File): Promise<any> {

    const arquivo = await this.uploadService.uploadImage(file);
    return { url: arquivo };
  }
  @Get()
  findAll() {
    return this.uploadService.listarArquivos();
  }

  @Delete()
  async deleteArquivo(url) {
    return this.uploadService.deleteArquivo(url);
  }




}
