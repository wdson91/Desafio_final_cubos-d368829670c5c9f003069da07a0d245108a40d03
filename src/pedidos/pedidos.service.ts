import { BadRequestException, Injectable, Query, UseGuards } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { PrismaService } from 'src/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { query } from 'express';
import { Prisma } from '@prisma/client';
import { EmailService } from './email.service';

@Injectable()

export class PedidosService {
  constructor(private prisma: PrismaService, private email: EmailService) { }
  async create(createPedidoDto: CreatePedidoDto) {

    const cliente = await this.prisma.clientes.findUnique({
      where: {
        id: createPedidoDto.cliente_id
      }
    });
    if (!cliente) {
      throw new BadRequestException('Cliente não encontrado');
    }
    const produtos = await this.prisma.produtos.findMany({
      where: {
        id: {
          in: createPedidoDto.pedido_produtos.map(item => item.produto_id)
        }
      }
    });

    if (produtos.length !== createPedidoDto.pedido_produtos.length) {
      throw new BadRequestException('Produto não encontrado');
    }
    for (let i = 0; i < createPedidoDto.pedido_produtos.length; i++) {

      if (produtos[i].quantidade_estoque < createPedidoDto.pedido_produtos[i]['quantidade_produto']) {

        throw new BadRequestException(`Estoque  do produto insuficiente`);
      }
    }



    const produtosId = produtos.map(produto => produto.id);

    const valorTotal = produtos.reduce((acc, produto) => {
      const pedido_produto = createPedidoDto.pedido_produtos.find(pedido_produto => pedido_produto.produto_id === produto.id);
      return acc + (pedido_produto.quantidade_produto * produto.valor);
    }, 0);



    try {

      const pedido = await this.prisma.pedidos.create({
        data: {
          cliente: { connect: { id: createPedidoDto.cliente_id } },
          oberservacao: createPedidoDto.observacao,
          valor_total: valorTotal,
          pedido_produtos: {
            create: produtos.map((item) => ({
              produto: { connect: { id: item.id } },
              quantidade_produto: createPedidoDto.pedido_produtos.find(produto => produto.produto_id === item.id).quantidade_produto,
              valor_produto: produtos.find(produto => produto.id === item.id).valor,
            })),
          },
        },
        include: { pedido_produtos: true }
      });

      await this.email.sendEmail(cliente.email, 'Pedido criado com sucesso', `Olá ${cliente.nome},seu pedido foi criado com sucesso`);
      console.log(cliente.email)
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Erro ao criar pedido');
    }

    return { message: 'Pedido criado com sucesso' }

  }

  async findAll(id?: number) {

    if (id) {
      const pedidos = await this.prisma.pedidos.findMany({
        where: {
          cliente_id: id
        },
        include: {
          pedido_produtos: true
        }
      });
      return { pedido: pedidos };
    } else {
      const pedidos = await this.prisma.pedidos.findMany({
        include: {
          pedido_produtos: true
        }
      });

      return { pedido: pedidos };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
