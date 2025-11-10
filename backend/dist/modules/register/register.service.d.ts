import { RegisterDTO } from './register.dto';
import { PrismaService } from 'src/database/PrismaService';
export declare class RegisterService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: RegisterDTO): Promise<{
        id: string;
        contentId: string;
        registeredAt: Date;
    }>;
    findAll(): Promise<({
        content: {
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        };
    } & {
        id: string;
        contentId: string;
        registeredAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        content: {
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        };
    } & {
        id: string;
        contentId: string;
        registeredAt: Date;
    }) | null>;
    update(id: string, data: RegisterDTO): Promise<{
        id: string;
        contentId: string;
        registeredAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        contentId: string;
        registeredAt: Date;
    }>;
}
