import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';



export class CreateClienteDto {

    @IsNotEmpty()
    @IsString()
    nome: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()

    cpf: string;

}
