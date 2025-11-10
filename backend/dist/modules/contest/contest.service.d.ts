import { ContestDTO } from './contest.dto';
import { PrismaService } from '../../database/PrismaService';
export declare class ContestService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: ContestDTO, userId: string): Promise<{
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    }>;
    findAll(userId: string): Promise<({
        Discipline: {
            id: string;
            name: string;
            color: string;
            contestId: string;
        }[];
    } & {
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    })[]>;
    findOne(id: string): Promise<({
        Discipline: {
            id: string;
            name: string;
            color: string;
            contestId: string;
        }[];
    } & {
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    }) | null>;
    update(id: string, data: ContestDTO): Promise<{
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    }>;
}
