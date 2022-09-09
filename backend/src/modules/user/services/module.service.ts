import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async create(userDto: UserCreateDto) {
    const user = await this.prisma.user.create({ 
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone_user: userDto.phone_user,
        radiogender: userDto.radiogender, 
        company_id_user: userDto.company_id_user,
        address:{
          createMany: { 
            data: userDto.address         
          }
        }
      },
    });

    return user;
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        address: {
          include: {
            trail: false
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      include: {
        address: {
          include: {
            trail: false
          }
        }
      },
      where: { id },
    });
  }

  async update(id: string, userDto: UpdateModuleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    }) 

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    return await this.prisma.user.update({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone_user: userDto.phone_user,
        radiogender: userDto.radiogender, 
        company_id_user: userDto.company_id_user,
        address:{
          createMany: { 
            data: userDto.address         
          }
        }
      },
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
