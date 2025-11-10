import { StageService } from './stage.service';
import { StageDTO } from './stage.dto';
export declare class StageController {
    private readonly stageService;
    constructor(stageService: StageService);
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
