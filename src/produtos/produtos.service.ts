import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma.service';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) { }
  async create(createProdutoDto: CreateProdutoDto) {

    const data = { ...createProdutoDto }

    return await this.prisma.produtos.create({
      data:
        { descricao: data.descricao, quantidade_estoque: data.quantidade_estoque, valor: data.valor, categoria_id: data.categoria_id, produto_imagem: data.imagem || null }

    });

  }

  findAll(id?: number) {

    if (id) {
      return this.prisma.produtos.findMany({ where: { categoria_id: Number(id) } })
    } else { return this.prisma.produtos.findMany() }


  }

  findOne(id: number) {

    return this.prisma.produtos.findUnique({ where: { id: id } })
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const data = { ...updateProdutoDto }

    const produto = await this.prisma.produtos.findUnique({ where: { id: id } })
    if (!produto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`)
    }

    try {
      await this.prisma.produtos.update({ where: { id: id }, data: { descricao: data.descricao, quantidade_estoque: data.quantidade_estoque, valor: data.valor, categoria_id: data.categoria_id } })
    } catch (error) {
      throw new BadRequestException(error.message)

    }

    return await this.prisma.produtos.findUnique({ where: { id: id } })

  }

  async remove(id: number) {

    try {
      await this.prisma.produtos.delete({ where: { id: id } })
      return { message: `Produto com id ${id} deletado com sucesso` }
    } catch (error) {
      throw new BadRequestException("Erro ao excluir produto")
    }
    const produto = await this.prisma.produtos.findUnique({ where: { id: id } })

    if (!produto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`)
    }

    return produto
  }
}
