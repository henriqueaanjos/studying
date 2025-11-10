import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentDTO } from './content.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}
  async create(data: ContentDTO) {
    const contentExists = await this.prisma.content.findFirst({
      where: {
        numberContent: data.numberContent,
        lessonId: data.lessonId,
      },
    });

    if (contentExists) {
      throw new BadRequestException('Content already exists');
    }

    const content = await this.prisma.content.create({
      data: {
        numberContent: data.numberContent,
        durationSeconds: data.durationSeconds,
        lessonId: data.lessonId,
        contentTypeId: data.contentTypeId,
      },
    });

    return content;
  }

  async findAll() {
    return this.prisma.content.findMany();
  }

  async findOne(id: string) {
    return this.prisma.content.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: ContentDTO) {
    return this.prisma.content.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.content.delete({
      where: {
        id,
      },
    });
  }
}
