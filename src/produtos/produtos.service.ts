import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/prisma.service';
import { Produto } from './entities/produto.entity';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService, private upload: UploadService) { }
  async create(createProdutoDto: CreateProdutoDto) {

    const data = { ...createProdutoDto }

    return await this.prisma.produtos.create({
      data:
        { descricao: data.descricao, quantidade_estoque: data.quantidade_estoque, valor: data.valor, categoria_id: data.categoria_id, produto_imagem: data.produto_imagem || null }

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
      if (data.produto_imagem) {

        const consulta = await this.upload.consultarImagem(data.produto_imagem);
        if (data.produto_imagem == produto.produto_imagem) {
          throw new BadRequestException(`Imagem já cadastrada`)
        }
        await this.upload.deleteArquivo(produto.produto_imagem)

        await this.prisma.produtos.update({ where: { id: id }, data: { descricao: data.descricao, quantidade_estoque: data.quantidade_estoque, valor: data.valor, categoria_id: data.categoria_id, produto_imagem: data.produto_imagem } })
      } else {
        await this.prisma.produtos.update({ where: { id: id }, data: { descricao: data.descricao, quantidade_estoque: data.quantidade_estoque, valor: data.valor, categoria_id: data.categoria_id, produto_imagem: null } })
      }
    } catch (error) {
      throw new BadRequestException(error.message)

    }

    return await this.prisma.produtos.findUnique({ where: { id: id } })

  }

  async remove(id: number) {
    const Produto = await this.prisma.produtos.findUnique({ where: { id: id } })

    if (!Produto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`)
    }
    const produtoPedido = await this.prisma.pedidoProduto.findFirst({ where: { produto_id: id } })

    if (produtoPedido) {
      throw new BadRequestException(`Produto com id ${id} não pode ser excluído pois está vinculado a um pedido`)
    }

    try {
      await this.prisma.produtos.delete({ where: { id: id } })
      if (Produto.produto_imagem) {
        await this.upload.deleteArquivo(Produto.produto_imagem)
      }
      return { message: `Produto com id ${id} deletado com sucesso` }
    } catch (error) {
      throw new BadRequestException("Erro ao excluir produto")
    }



  }
}
