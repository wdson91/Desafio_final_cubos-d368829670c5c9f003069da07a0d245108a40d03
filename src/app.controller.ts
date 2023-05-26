import { Controller, Get, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { getEnvironmentData } from 'worker_threads';
import { UploadService } from './upload/upload.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private upload: UploadService) { }

  @Get()

  async getHello(@Body() body: any): Promise<object> {


    return this.appService.getHello();
  }
}
