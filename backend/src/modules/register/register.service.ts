import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './register.dto';
import { PrismaService } from '../../database/PrismaService';;

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}
  async create(data: RegisterDTO) {
    const registerExists = await this.prisma.register.findFirst({
      where: {
        contentId: data.contentId,
      },
    });

    if (registerExists) {
      return await this.remove(registerExists.id);
    }

    const register = await this.prisma.register.create({
      data,
    });

    return register;
  }

  async findAll() {
    return this.prisma.register.findMany({
      include: {
        content: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.register.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });
  }

  async update(id: string, data: RegisterDTO) {
    return this.prisma.register.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.register.delete({
      where: {
        id,
      },
    });
  }
}
