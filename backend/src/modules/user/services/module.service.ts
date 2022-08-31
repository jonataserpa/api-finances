import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(userDto: UserCreateDto) {
    const user = await this.prisma.user.create({ data: userDto });

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  async update(id: string, data: UpdateModuleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    }) 

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return await this.prisma.user.update({
      data,
      where: { id },
    })
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    }) 

    if (!user) {
      throw new Error(`User does not exist`);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
