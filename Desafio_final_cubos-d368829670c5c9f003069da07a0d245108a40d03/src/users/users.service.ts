import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {

    }
    async getUser(id: number): Promise<any> {

        const user = await this.prisma.users.findUnique({ where: { id: id } });

        return { ...user, password: undefined };
    }

    async updateUser(id: number, userData: UserDto): Promise<any> {

        //console.log(userData)
        const user = await this.getUser(id)

        const userEmail = await this.prisma.users.findUnique({ where: { email: userData.email } });

        if (userEmail && userEmail.id != id) {
            throw new BadRequestException('email already exists');
        }
        const hashPassword = bcrypt.hashSync(userData.password, 10);
        const userUpdated = await this.prisma.users.update({
            where: { id: id },
            data: {
                name: userData.name,
                email: userData.email,
                password: hashPassword,
                updatedAt: new Date()

            }
        })

        return { ...userUpdated, password: undefined };
    }
}
