export type disciplineDTO = {
    id?: string;
    name: string;
    color: string;
    contestId: string;
}

export type disciplineResumeDTO = {
    id: string;
    name: string;
    color: string;
    totalLessons: number;
    totalContents: number;
    totalDuration: number; // duration in seconds
    completedContents: number;
    completedDuration: number; // duration in seconds
}
