import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  async getHello(): Promise<object> {

    return await this.prisma.categories.findMany({});
  }
}
