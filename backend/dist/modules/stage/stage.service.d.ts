import { StageDTO } from './stage.dto';
import { PrismaService } from 'src/database/PrismaService';
export declare class StageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: StageDTO): Promise<{
        id: string;
        name: string;
        description: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string;
    } | null>;
    update(id: string, data: StageDTO): Promise<{
        id: string;
        name: string;
        description: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string;
    }>;
}
