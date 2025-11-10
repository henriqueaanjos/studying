import { LessonService } from './lesson.service';
import { LessonDTO } from './lesson.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(data: LessonDTO): Promise<{
        id: string;
        numberLesson: number;
        disciplineId: string;
        stageId: string;
    }>;
    findAll(): Promise<{
        contentTypes: string[];
        topicTitles: string[];
        totalContents: number;
        totalDuration: number;
        completedContents: number;
        completedDuration: number;
        discipline: {
            id: string;
            name: string;
            color: string;
            contestId: string;
        };
        Topic: {
            id: string;
            name: string;
            lessonId: string;
        }[];
        Content: ({
            contentType: {
                id: string;
                name: string;
            };
            Register: {
                id: string;
                contentId: string;
                registeredAt: Date;
            }[];
        } & {
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        })[];
        id: string;
        numberLesson: number;
        disciplineId: string;
        stageId: string;
    }[]>;
    findOne(id: string): Promise<{
        contentTypes: string[];
        topicTitles: string[];
        totalContents: number;
        totalDuration: number;
        completedContents: number;
        completedDuration: number;
        Topic: {
            id: string;
            name: string;
            lessonId: string;
        }[];
        Content: ({
            contentType: {
                id: string;
                name: string;
            };
            Register: {
                id: string;
                contentId: string;
                registeredAt: Date;
            }[];
        } & {
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        })[];
        id: string;
        numberLesson: number;
        disciplineId: string;
        stageId: string;
    }>;
    update(id: string, data: LessonDTO): Promise<{
        id: string;
        numberLesson: number;
        disciplineId: string;
        stageId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        numberLesson: number;
        disciplineId: string;
        stageId: string;
    }>;
}
