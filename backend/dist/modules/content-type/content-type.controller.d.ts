import { ContentTypeService } from './content-type.service';
import { ContentTypeDTO } from './content-type.dto';
export declare class ContentTypeController {
    private readonly contentTypeService;
    constructor(contentTypeService: ContentTypeService);
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
