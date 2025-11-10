import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { LessonDTO } from './lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(data: LessonDTO) {
    const lessonExists = await this.prisma.lesson.findFirst({
      where: {
        numberLesson: data.numberLesson,
        disciplineId: data.disciplineId,
      },
    });

    if (lessonExists) {
      throw new BadRequestException('Lesson already exists');
    }

    const lesson = await this.prisma.lesson.create({
      data: {
        numberLesson: data.numberLesson,
        disciplineId: data.disciplineId,
        stageId: data.stageId,
      },
    });

    return lesson;
  }

  async findAll() {
    const lessons = await this.prisma.lesson.findMany({
      include: {
        discipline: true,
        Content: {
          include: {
            Register: true,
            contentType: true,
          },
        },
        Topic: true,
      },
    });

    return lessons.map((lesson) => {
      const contents = lesson.Content || [];

      const topicTitles = lesson.Topic.map((topic) => topic.name);

      const contentTypes = [
        ...new Set(contents.map((content) => content.contentType.name)),
      ];

      const totalContents = contents.length;

      const totalDuration = contents.reduce(
        (sum, content) => sum + (content.durationSeconds || 0),
        0,
      );

      const completedContents = contents.filter(
        (content) => content.Register && content.Register.length > 0,
      ).length;

      const completedDuration = contents.reduce((sum, content) => {
        if (content.Register && content.Register.length > 0) {
          return sum + (content.durationSeconds || 0);
        }
        return sum;
      }, 0);

      return {
        ...lesson,
        contentTypes,
        topicTitles,
        totalContents,
        totalDuration,
        completedContents,
        completedDuration,
      };
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: {
        id,
      },
      include: {
        Content: {
          include: {
            Register: true,
            contentType: true,
          },
        },
        Topic: true,
      },
    });

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    const contents = lesson.Content || [];

    const topicTitles = lesson.Topic.map((topic) => topic.name);

    const contentTypes = [
      ...new Set(contents.map((content) => content.contentType.name)),
    ];

    const totalContents = contents.length;

    const totalDuration = contents.reduce(
      (sum, content) => sum + (content.durationSeconds || 0),
      0,
    );

    const completedContents = contents.filter(
      (content) => content.Register && content.Register.length > 0,
    ).length;

    const completedDuration = contents.reduce((sum, content) => {
      if (content.Register && content.Register.length > 0) {
        return sum + (content.durationSeconds || 0);
      }
      return sum;
    }, 0);

    return {
      ...lesson,
      contentTypes,
      topicTitles,
      totalContents,
      totalDuration,
      completedContents,
      completedDuration,
    };
  }

  async update(id: string, data: LessonDTO) {
    return this.prisma.lesson.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({
      where: {
        id,
      },
    });
  }
}
