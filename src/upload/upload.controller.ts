import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
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

  @Delete(':url')
  async deleteArquivo(@Param('url') url: string) {
    return await this.uploadService.deleteArquivo(url);
  }




}
