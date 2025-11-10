import { TopicService } from './topic.service';
import { TopicDTO } from './topic.dto';
export declare class TopicController {
    private readonly topicService;
    constructor(topicService: TopicService);
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
