import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { DisciplineDTO } from './discipline.dto';

@Injectable()
export class DisciplineService {
  constructor(private prisma: PrismaService) {}

  async create(data: DisciplineDTO) {
    const disciplineExists = await this.prisma.discipline.findFirst({
      where: {
        name: data.name,
        contestId: data.contestId,
      },
    });

    if (disciplineExists) {
      throw new BadRequestException('Discipline already exists');
    }

    const discipline = await this.prisma.discipline.create({
      data,
    });

    return discipline;
  }

  async findAll() {
    const disciplines = await this.prisma.discipline.findMany({
      include: {
        Lesson: {
          include: {
            Content: {
              include: {
                Register: true,
              },
            },
          },
        },
      },
    });

    return disciplines.map((discipline) => {
      const lessons = discipline.Lesson || [];

      const totalLessons = lessons.length;
      const totalContents = lessons.reduce(
        (sum, lesson) => sum + (lesson.Content?.length || 0),
        0,
      );

      const allContents = lessons.flatMap((lesson) => lesson.Content || []);
      const totalDuration = allContents.reduce(
        (sum, content) => sum + (content.durationSeconds || 0),
        0,
      );

      const completedContents = allContents.filter(
        (content) => content.Register && content.Register.length > 0,
      ).length;

      const completedDuration = allContents.reduce((sum, content) => {
        if (content.Register && content.Register.length > 0) {
          return sum + (content.durationSeconds || 0);
        }
        return sum;
      }, 0);

      return {
        ...discipline,
        totalLessons,
        totalContents,
        totalDuration,
        completedContents,
        completedDuration,
      };
    });
  }

  async findOne(id: string) {
    const discipline = await this.prisma.discipline.findUnique({
      where: {
        id,
      },
      include: {
        Lesson: {
          include: {
            Content: {
              include: {
                Register: true,
              },
            },
          },
        },
      },
    });

    if (!discipline) {
      throw new BadRequestException('Discipline not found');
    }

    const lessons = discipline.Lesson || [];

    const totalLessons = lessons.length;
    const totalContents = lessons.reduce(
      (sum, lesson) => sum + (lesson.Content?.length || 0),
      0,
    );

    const allContents = lessons.flatMap((lesson) => lesson.Content || []);
    const totalDuration = allContents.reduce(
      (sum, content) => sum + (content.durationSeconds || 0),
      0,
    );

    const completedContents = allContents.filter(
      (content) => content.Register && content.Register.length > 0,
    ).length;

    const completedDuration = allContents.reduce((sum, content) => {
      if (content.Register && content.Register.length > 0) {
        return sum + (content.durationSeconds || 0);
      }
      return sum;
    }, 0);

    return {
      ...discipline,
      totalLessons,
      totalContents,
      totalDuration,
      completedContents,
      completedDuration,
    };
  }

  async update(id: string, data: DisciplineDTO) {
    return this.prisma.discipline.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.discipline.delete({
      where: {
        id,
      },
    });
  }
}
