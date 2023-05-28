import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pedido')

export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    if (createPedidoDto.pedido_produtos.length < 1) {
      throw new BadRequestException('Pedido deve ter pelo menos um produto');
    }
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query('cliente_id') id: number) {
    return this.pedidosService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
