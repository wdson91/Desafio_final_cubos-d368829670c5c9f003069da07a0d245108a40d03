import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';

@Module({
    imports: [AuthModule],
    controllers: [UsersController],
    providers: [PrismaService, UsersService],
})
export class UsersModule {

}
