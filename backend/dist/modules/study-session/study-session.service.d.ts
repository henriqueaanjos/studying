import { PrismaService } from '../../database/PrismaService';
export declare class StudySessionService {
    private prisma;
    constructor(prisma: PrismaService);
    generateSession(idContest: string): Promise<{
        disciplineName: string;
        disciplineColor: string;
        numberLesson: number;
        stageName: string;
        contentTypeName: string;
        contentTypeId: string;
        contentType: {
            id: string;
            name: string;
        };
        Register: {
            id: string;
            contentId: string;
            registeredAt: Date;
        }[];
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
    }[]>;
    generateStudyPlan(idContest: string): Promise<{
        date: Date;
        contents: {
            disciplineName: string;
            numberLesson: number;
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        }[];
    }[]>;
    getContentsByDate(idContest: string, date: Date): Promise<{
        disciplineName: string;
        numberLesson: number;
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }[]>;
}
