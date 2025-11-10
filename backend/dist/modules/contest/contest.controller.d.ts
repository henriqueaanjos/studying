import { ContestService } from './contest.service';
import { ContestDTO } from './contest.dto';
import { RequestWithUser } from '../auth/auth.guard';
export declare class ContestController {
    private readonly contestService;
    constructor(contestService: ContestService);
    create(data: ContestDTO, req: RequestWithUser): Promise<{
        id: string;
        companyName: string;
        position: string;
        exameDate: Date;
        dedicationHours: number;
        userId: string;
    }>;
    findAll(req: RequestWithUser): Promise<({
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
