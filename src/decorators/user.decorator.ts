import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1]; // Extrai o token do cabeçalho Authorization

    const jwtService = new JwtService({}); // Inicializa o serviço JwtService (verifique as configurações do seu projeto)
    const decodedToken = jwtService.decode(token); // Decodifica o token para obter as informações
    
    return decodedToken['id']// Retorna somente o ID do token
  },
);
