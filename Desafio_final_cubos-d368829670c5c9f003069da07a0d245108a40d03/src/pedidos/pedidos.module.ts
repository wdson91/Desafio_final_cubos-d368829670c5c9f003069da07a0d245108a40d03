import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

import { PrismaService } from 'src/prisma.service';
import { EmailService } from './email.service';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, PrismaService, EmailService]
})
export class PedidosModule { }
