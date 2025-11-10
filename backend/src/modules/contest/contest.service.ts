import { BadRequestException, Injectable } from '@nestjs/common';
import { ContestDTO } from './contest.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ContestService {
  constructor(private prisma: PrismaService) {}

  async create(data: ContestDTO, userId: string) {
    const contestExits = await this.prisma.contest.findFirst({
      where: {
        companyName: data.companyName,
        position: data.position,
        userId: userId,
      },
    });

    if (contestExits) {
      throw new BadRequestException('Contest already exists');
    }

    const localDate = new Date(data.exameDate);
    const offsetMs = localDate.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(localDate.getTime() + offsetMs);
    const contest = await this.prisma.contest.create({
      data: {
        ...data,
        exameDate: adjustedDate,
        userId: userId,
      },
    });

    return contest;
  }

  async findAll(userId: string) {
    return this.prisma.contest.findMany({
      where: {
        userId,
      },
      include: {
        Discipline: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.contest.findUnique({
      where: {
        id,
      },
      include: {
        Discipline: true,
      },
    });
  }

  async update(id: string, data: ContestDTO) {
    return this.prisma.contest.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.contest.delete({
      where: {
        id,
      },
    });
  }
}
