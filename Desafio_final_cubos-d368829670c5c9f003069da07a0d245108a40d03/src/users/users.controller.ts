import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserId } from 'src/decorators/user.decorator';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/user.dto';



@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@UserId() id): Promise<any> {
        return await this.usersService.getUser(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async updateUser(@UserId() id, @Body() UserDto): Promise<any> {
        return await this.usersService.updateUser(id, UserDto);
    }

}

