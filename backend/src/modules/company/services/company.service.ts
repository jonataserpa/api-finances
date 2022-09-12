import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(companyDto: CreateCompanyDto) {
    const user = await this.prisma.company.create({
      data: {
        reasonsocial: companyDto.reasonsocial,
        namefantasy: companyDto.namefantasy,
        CNPJ: companyDto.CNPJ,
        phone_company: companyDto.phone_company,
        address: {
          createMany: {
            data: companyDto.address,
          },
        },
      },
    });

    return user;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string; }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.company.findMany({
        include: {
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    } else {
      data = await this.prisma.company.findMany({
        skip,
        take,
        where: {
          reasonsocial: {
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

    const totalCount = await this.prisma.company.findMany();

    const dataCompanys = {
      data,
      headers: totalCount.length -1,
    };
    return dataCompanys;
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

  async update(id: string, companyDto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`company ${id} does not exist`);
    }

    return await this.prisma.company.update({
      data: {
        reasonsocial: companyDto.reasonsocial,
        namefantasy: companyDto.namefantasy,
        CNPJ: companyDto.CNPJ,
        phone_company: companyDto.phone_company,
        address: {
          createMany: {
            data: companyDto.address,
          },
        },
      },
      where: { id },
    });
  }

  async remove(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`company does not exist`);
    }

    return await this.prisma.company.delete({
      where: { id },
    });
  }
}
