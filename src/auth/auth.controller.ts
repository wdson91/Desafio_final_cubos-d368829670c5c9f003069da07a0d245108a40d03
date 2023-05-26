import { Controller, Post, Body, BadRequestException, UseGuards, Req } from '@nestjs/common';

import { UserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { UserId } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) { }

  @Post('register')
  async registerUser(@Body() userData: UserDto): Promise<any> {

    return this.auth.createUser(userData);
  }

  @Post('login')
  async loginUser(@Body() userData: LoginDto): Promise<any> {

    const token = await this.auth.loginUser(userData);
    return { token: token }

  }

  @Post('teste')
  @UseGuards(JwtAuthGuard)
  async teste(@UserId() id): Promise<any> {

    console.log(id);
  }
}
