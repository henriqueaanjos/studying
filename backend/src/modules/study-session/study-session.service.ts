import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class StudySessionService {
  constructor(private prisma: PrismaService) {}

  async generateSession(idContest: string) {
    const contest = await this.prisma.contest.findUnique({
      where: { id: idContest },
      include: {
        Discipline: {
          include: {
            Lesson: {
              include: {
                Content: {
                  include: {
                    Register: true,
                    contentType: true,
                  },
                },
                stage: true,
              },
            },
          },
        },
      },
    });

    if (!contest) {
      throw new BadRequestException('Contest not found');
    }

    const timeToStudyInSeconds = contest.dedicationHours * 3600 || 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Coleta todos os conteúdos não registrados
    const allContents = contest.Discipline.flatMap((discipline) =>
      discipline.Lesson.flatMap((lesson) =>
        lesson.Content.filter((content) => {
          if (!content.Register || content.Register.length === 0) return true;

          const lastRegister = content.Register[content.Register.length - 1];
          const registerDate = new Date(lastRegister.registeredAt);
          registerDate.setHours(0, 0, 0, 0);

          // mantém o conteúdo se o registro for de hoje
          return registerDate.getTime() === today.getTime();
        }).map((content) => ({
          ...content,
          disciplineName: discipline.name,
          disciplineColor: discipline.color,
          numberLesson: lesson.numberLesson,
          stageName: lesson.stage.name,
          contentTypeName: content.contentType.name,
          contentTypeId: content.contentType.id,
        })),
      ),
    );

    // Ordena por disciplina e por número da lição
    allContents.sort((a, b) => {
      if (a.disciplineName === b.disciplineName) {
        return a.numberLesson - b.numberLesson;
      }
      return a.disciplineName.localeCompare(b.disciplineName);
    });

    const { selectedContents } = allContents.reduce(
      (acc, content) => {
        const duration =
          content.durationSeconds || content.durationSeconds || 0;
        if (acc.accumulatedTime + duration > timeToStudyInSeconds) return acc;
        return {
          accumulatedTime: acc.accumulatedTime + duration,
          selectedContents: [...acc.selectedContents, content],
        };
      },
      { accumulatedTime: 0, selectedContents: [] as typeof allContents },
    );

    return selectedContents;
  }

  async generateStudyPlan(idContest: string) {
    const contest = await this.prisma.contest.findUnique({
      where: { id: idContest },
      include: {
        Discipline: {
          include: {
            Lesson: {
              include: {
                Content: true,
              },
            },
          },
        },
      },
    });

    if (!contest) {
      throw new BadRequestException('Contest not found');
    }

    const timeToStudyInSeconds = contest.dedicationHours * 3600 || 0;

    // Coleta todos os conteúdos em uma única lista
    const allContents = contest.Discipline.flatMap((discipline) =>
      discipline.Lesson.flatMap((lesson) =>
        lesson.Content.map((content) => ({
          ...content,
          disciplineName: discipline.name,
          numberLesson: lesson.numberLesson,
        })),
      ),
    );

    // Ordena por disciplina e por número da lição
    allContents.sort((a, b) => {
      if (a.disciplineName === b.disciplineName) {
        return a.numberLesson - b.numberLesson;
      }
      return a.disciplineName.localeCompare(b.disciplineName);
    });

    const studyPlan = allContents.reduce(
      (acc, content) => {
        const duration =
          content.durationSeconds || content.durationSeconds || 0;
        const lastBlock = acc.blocks[acc.blocks.length - 1];
        const accumulatedTime = lastBlock?.contents.reduce(
          (sum, c) => sum + (c.durationSeconds || c.durationSeconds || 0),
          0,
        );

        if (!lastBlock || accumulatedTime + duration > timeToStudyInSeconds) {
          const newDate = new Date(acc.currentDate);
          if (lastBlock) newDate.setDate(newDate.getDate() + 1);
          return {
            currentDate: newDate,
            blocks: [...acc.blocks, { date: newDate, contents: [content] }],
          };
        }

        lastBlock.contents.push(content);
        return acc;
      },
      {
        currentDate: new Date(),
        blocks: [] as { date: Date; contents: typeof allContents }[],
      },
    ).blocks;

    // Adiciona o último bloco
    if (studyPlan.length > 0) {
      studyPlan.push({ date: new Date(), contents: [] });
    }

    return studyPlan;
  }

  async getContentsByDate(idContest: string, date: Date) {
    const studyPlan = await this.generateStudyPlan(idContest);

    const targetDate = new Date(date);
    const day = targetDate.getDate();
    const month = targetDate.getMonth();
    const year = targetDate.getFullYear();

    const dayBlock = studyPlan.find((block) => {
      const blockDate = new Date(block.date);
      return (
        blockDate.getDate() === day &&
        blockDate.getMonth() === month &&
        blockDate.getFullYear() === year
      );
    });

    return dayBlock ? dayBlock.contents : [];
  }
}
