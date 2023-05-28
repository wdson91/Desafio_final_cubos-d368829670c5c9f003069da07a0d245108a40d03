import { IsString, IsNotEmpty, IsPositive } from "class-validator";

export class CreateProdutoDto {


    id?: number;
    @IsString()
    @IsNotEmpty()
    descricao: string;
    @IsNotEmpty()
    @IsPositive()
    quantidade_estoque: number;
    @IsNotEmpty()
    @IsPositive()
    valor: number;
    @IsNotEmpty()
    @IsPositive()
    categoria_id: number;
    produto_imagem?: string;

}
