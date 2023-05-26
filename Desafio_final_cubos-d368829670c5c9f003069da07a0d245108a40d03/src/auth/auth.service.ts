import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/dto/login.dto';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class AuthService {

  constructor(

    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async createUser(userData: User): Promise<User> {
    const existingUser = await this.prisma.users.findFirst({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = await this.prisma.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    return user;
  }
  async validateUser(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({ where: { email: email } });
    if (user) {
      return user;
    }
    return null;
  }

  async loginUser(userData: LoginDto) {
    const findUser = await this.prisma.users.findFirst({
      where: { email: userData.email },
    });
    if (!findUser) {
      throw new BadRequestException('Invalid credentials');
    }
    const user = await this.prisma.users.findUnique({ where: { email: userData.email } });

    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
