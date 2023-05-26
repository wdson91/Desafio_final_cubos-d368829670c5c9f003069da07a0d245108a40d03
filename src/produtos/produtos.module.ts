import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService, UploadService]
})
export class ProdutosModule { }
