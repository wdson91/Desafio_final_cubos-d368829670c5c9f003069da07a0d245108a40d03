import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService]
})
export class ClientesModule { }
