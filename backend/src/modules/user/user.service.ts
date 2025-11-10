import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { getRedis, setRedis } from '../../libs/redisConfig';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const userExits = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExits) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });

    await setRedis(`user-${user.id}`, JSON.stringify(user));

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const userRedis = await getRedis(`user-${id}`);
    if (userRedis) {
      return JSON.parse(userRedis) as UserDTO;
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
