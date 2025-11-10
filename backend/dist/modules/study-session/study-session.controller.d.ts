import { StudySessionService } from './study-session.service';
export declare class StudySessionController {
    private readonly studySessionService;
    constructor(studySessionService: StudySessionService);
    generateSession(id: string): Promise<{
        disciplineName: string;
        disciplineColor: string;
        numberLesson: number;
        stageName: string;
        contentTypeName: string;
        contentTypeId: string;
        contentType: {
            id: string;
            name: string;
        };
        Register: {
            id: string;
            contentId: string;
            registeredAt: Date;
        }[];
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
    }[]>;
    generateStudyPlan(id: string): Promise<{
        date: Date;
        contents: {
            disciplineName: string;
            numberLesson: number;
            id: string;
            numberContent: number;
            durationSeconds: number;
            lessonId: string;
            contentTypeId: string;
        }[];
    }[]>;
    getContentsByDate(id: string, date: string): Promise<{
        disciplineName: string;
        numberLesson: number;
        id: string;
        numberContent: number;
        durationSeconds: number;
        lessonId: string;
        contentTypeId: string;
    }[]>;
}
