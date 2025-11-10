import { PrismaService } from '../../database/PrismaService';
import { UserDTO } from './user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<UserDTO | {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
