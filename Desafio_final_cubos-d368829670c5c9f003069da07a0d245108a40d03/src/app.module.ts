import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { PedidosModule } from './pedidos/pedidos.module';
import * as B2 from 'backblaze-b2';





@Module({
  imports: [AuthModule, MulterModule.register({
    dest: '../uploads', // Define o diretório de armazenamento dos arquivos
  }), UsersModule, ProdutosModule, ClientesModule, UploadModule, PedidosModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, UploadService],
})
export class AppModule { }
