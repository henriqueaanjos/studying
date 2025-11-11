import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';;
import { TopicDTO } from './topic.dto';

@Injectable()
export class TopicService {
  constructor(private prisma: PrismaService) {}

  async create(data: TopicDTO) {
    const topicExists = await this.prisma.topic.findFirst({
      where: {
        name: data.name,
        lessonId: data.lessonId,
      },
    });

    if (topicExists) {
      throw new BadRequestException('Topic already exists');
    }

    const topic = await this.prisma.topic.create({
      data,
    });
    return topic;
  }

  async findAll() {
    return this.prisma.topic.findMany();
  }

  async findOne(id: string) {
    return this.prisma.topic.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: TopicDTO) {
    return this.prisma.topic.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.topic.delete({
      where: { id },
    });
  }
}
