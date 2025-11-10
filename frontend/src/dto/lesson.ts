import { disciplineDTO } from "./discipline";

export type lessonDTO = {
    id?: string;
    numberLesson: number;
    disciplineId: string;
    stageId: string;
    topics?: string[];
}

export type lessonResumeDTO = {
    id: string;
    numberLesson: number;
    discipline: disciplineDTO;
    contentTypes: string[];
    topicTitles: string[];
    totalContents: number;
    totalDuration: number; // duration in seconds
    completedContents: number;
    completedDuration: number; // duration in seconds
}