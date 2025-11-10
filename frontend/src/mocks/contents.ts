import { contentDTO } from "@/dto/content";
import { lessons } from "./lessons";

export const contents: contentDTO[] = [
    {
        id: 1,
        contentNumber: 0,
        type: 'pdf',
        class: lessons.filter(c => c.discipline.id === 1 && c.classNumber ===0)[0],
        duration: 3600,
    },
    {
        id: 2,
        contentNumber: 1,
        type: 'video',
        class: lessons.filter(c => c.discipline.id === 1 && c.classNumber ===1)[0],
        duration: 973,
    },
]