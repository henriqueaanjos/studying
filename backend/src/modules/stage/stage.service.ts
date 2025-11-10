import { BadRequestException, Injectable } from '@nestjs/common';
import { StageDTO } from './stage.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class StageService {
  constructor(private prisma: PrismaService) {}
  async create(data: StageDTO) {
    const stageExists = await this.prisma.stage.findFirst({
      where: {
        name: data.name,
      },
    });

    if (stageExists) {
      throw new BadRequestException('Stage already exists');
    }

    const stage = await this.prisma.stage.create({
      data,
    });

    return stage;
  }

  async findAll() {
    return this.prisma.stage.findMany();
  }

  async findOne(id: string) {
    return this.prisma.stage.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: StageDTO) {
    return this.prisma.stage.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.stage.delete({
      where: {
        id,
      },
    });
  }
}
