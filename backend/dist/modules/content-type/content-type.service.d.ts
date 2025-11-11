import { ContentTypeDTO } from './content-type.dto';
import { PrismaService } from '../../database/PrismaService';
export declare class ContentTypeService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: ContentTypeDTO): Promise<{
        id: string;
        name: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
    } | null>;
    update(id: string, data: ContentTypeDTO): Promise<{
        id: string;
        name: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
    }>;
}
