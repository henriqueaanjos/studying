import { PrismaService } from '../../database/PrismaService';
import { DisciplineDTO } from './discipline.dto';
export declare class DisciplineService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: DisciplineDTO): Promise<{
        id: string;
        name: string;
        color: string;
        contestId: string;
    }>;
    findAll(): Promise<{
        totalLessons: number;
        totalContents: number;
        totalDuration: number;
        completedContents: number;
        completedDuration: number;
        Lesson: ({
            Content: ({
                Register: {
                    id: string;
                    contentId: string;
                    registeredAt: Date;
                }[];
            } & {
                id: string;
                numberContent: number;
                durationSeconds: number;
                lessonId: string;
                contentTypeId: string;
            })[];
        } & {
            id: string;
            numberLesson: number;
            disciplineId: string;
            stageId: string;
        })[];
        id: string;
        name: string;
        color: string;
        contestId: string;
    }[]>;
    findOne(id: string): Promise<{
        totalLessons: number;
        totalContents: number;
        totalDuration: number;
        completedContents: number;
        completedDuration: number;
        Lesson: ({
            Content: ({
                Register: {
                    id: string;
                    contentId: string;
                    registeredAt: Date;
                }[];
            } & {
                id: string;
                numberContent: number;
                durationSeconds: number;
                lessonId: string;
                contentTypeId: string;
            })[];
        } & {
            id: string;
            numberLesson: number;
            disciplineId: string;
            stageId: string;
        })[];
        id: string;
        name: string;
        color: string;
        contestId: string;
    }>;
    update(id: string, data: DisciplineDTO): Promise<{
        id: string;
        name: string;
        color: string;
        contestId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        color: string;
        contestId: string;
    }>;
}
