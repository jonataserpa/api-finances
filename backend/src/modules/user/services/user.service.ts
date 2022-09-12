import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserCreateDto) {
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone_user: userDto.phone_user,
        radiogender: userDto.radiogender,
        company_id_user: userDto.company_id_user,
        address: {
          createMany: {
            data: userDto.address,
          },
        },
      },
    });

    return user;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.user.findMany({
        include: {
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    } else {
      data = await this.prisma.user.findMany({
        skip,
        take,
        where: {
          name: {
            contains: filter,
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    }

    const totalCount = await this.prisma.user.findMany();

    const dataUsers = {
      data,
      headers: totalCount.length - 1,
    };
    return dataUsers;
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      include: {
        address: {
          include: {
            trail: false,
          },
        },
      },
      where: { id },
    });
  }

  async update(id: string, userDto: UpdateModuleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    const updateUser = await this.prisma.user.update({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone_user: userDto.phone_user,
        radiogender: userDto.radiogender,
        company_id_user: userDto.company_id_user,
      },
      where: { id },
    });

    this.prisma.$transaction(
      userDto.address.map((adr) =>
        this.prisma.address.upsert({
          where: { id: adr.id },
          update: { 
            adrees: adr.adrees,
            cep: adr.cep,
            city: adr.city,
            number_end: adr.number_end,
            state: adr.state,
          },
          create: adr,
        }),
      ),
    );

    return updateUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
