import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
export class CreatePedidoDto {

    @IsNotEmpty()
    @IsPositive()
    cliente_id: number;
    observacao: string;

    @IsNotEmpty()
    pedido_produtos: [{
        produto_id: number;
        quantidade_produto: number;
    }]


}
