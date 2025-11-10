export type contentDTO = {
    id?: string;
    numberContent: number;
    durationSeconds:  number; 
    lessonId: string;
    contentTypeId: string;
}

export type contentDTOFormat = {
    id?: string;
    numberContent?: number;
    durationSeconds?:  string; 
    lessonId?: string;
    contentTypeId?: string;
}