import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentDTO } from './content.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async createContents(data: ContentDTO[]) {
    const createdContents: ContentDTO[] = [];

    for (const contentData of data) {
      const contentExists = await this.prisma.content.findFirst({
        where: {
          numberContent: contentData.numberContent,
          lessonId: contentData.lessonId,
        },
      });

      if (contentExists) {
        throw new BadRequestException(
          `Content already exists: Lesson ID ${contentData.lessonId}, Number Content ${contentData.numberContent}`,
        );
      }

      const content = await this.prisma.content.create({
        data: {
          numberContent: contentData.numberContent,
          durationSeconds: contentData.durationSeconds,
          lessonId: contentData.lessonId,
          contentTypeId: contentData.contentTypeId,
        },
      });

      createdContents.push(content);
    }
    return createdContents;
  }

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
