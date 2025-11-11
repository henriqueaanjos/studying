import { PrismaService } from '../../database/PrismaService';
import { TopicDTO } from './topic.dto';
export declare class TopicService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: TopicDTO): Promise<{
        id: string;
        name: string;
        lessonId: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        lessonId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        lessonId: string;
    } | null>;
    update(id: string, data: TopicDTO): Promise<{
        id: string;
        name: string;
        lessonId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        lessonId: string;
    }>;
}
