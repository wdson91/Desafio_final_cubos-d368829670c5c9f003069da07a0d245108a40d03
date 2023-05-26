import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createClienteDto: CreateClienteDto) {
    const cpf = await this.prismaService.clientes.findUnique({ where: { cpf: createClienteDto.cpf } })
    const email = await this.prismaService.clientes.findUnique({ where: { email: createClienteDto.email } })
    if (cpf) {
      return new BadRequestException('CPF já cadastrado')
    }
    else if (email) {
      throw new BadRequestException('Email já cadastrado')

    }
    try {
      const data = { ...createClienteDto }

      const cliente = await this.prismaService.clientes.create({ data: { nome: data.nome, email: data.email, cpf: data.cpf } })

      return cliente

    } catch (error) {
      return { error: 'Erro ao cadastrar cliente' }
    }

  }

  findAll() {

    try {
      const clientes = this.prismaService.clientes.findMany()
      return clientes
    } catch (error) {
      return { error: 'Erro ao buscar clientes' }
    }
  }

  async findOne(id: number) {

    try {
      const cliente = await this.prismaService.clientes.findUnique({ where: { id: id } })
      return cliente
    } catch (error) {
      return new BadRequestException('Cliente não encontrado')
    }


  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const existeCliente = await this.prismaService.clientes.findUnique({ where: { id: id } })

    if (!existeCliente) {
      throw new BadRequestException('Cliente não encontrado')
    }
    if (updateClienteDto.cpf) {
      const cpf = await this.prismaService.clientes.findUnique({ where: { cpf: updateClienteDto.cpf } })
      if (cpf) {
        throw new BadRequestException('CPF já cadastrado')
      }
    }
    if (updateClienteDto.email) {
      const email = await this.prismaService.clientes.findUnique({ where: { email: updateClienteDto.email } })
      if (email) {
        throw new BadRequestException('Email já cadastrado')
      }
    }
    try {
      const cliente = await this.prismaService.clientes.update({ where: { id: id }, data: { ...updateClienteDto, updatedAt: new Date() } })
      return cliente
    } catch (error) {
      return { error: 'Erro ao atualizar cliente' }
    }

  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
