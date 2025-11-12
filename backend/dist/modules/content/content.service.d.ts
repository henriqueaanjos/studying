import { ContentDTO } from './content.dto';
import { PrismaService } from '../../database/PrismaService';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    createContents(data: ContentDTO[]): Promise<ContentDTO[]>;
    create(data: ContentDTO): Promise<{
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }>;
    findAll(): Promise<{
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    } | null>;
    update(id: string, data: ContentDTO): Promise<{
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }>;
}
