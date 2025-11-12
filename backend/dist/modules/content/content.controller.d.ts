import { ContentService } from './content.service';
import { ContentDTO } from './content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
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
