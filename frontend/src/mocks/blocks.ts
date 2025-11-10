import { blockDTO } from "@/dto/block";
import { contents } from "./contents";
import { lessons } from "./lessons";

export const blocks: blockDTO[] = [
    {
        id: 1,
        class: lessons.filter(c => c.discipline.id === 1 && c.classNumber ===0)[0],
        contents: contents.filter(ct => ct.class.classNumber === 0),
    },
    {
        id:2,
        class: lessons.filter(c => c.discipline.id === 1 && c.classNumber ===1)[0],
        contents: contents.filter(ct => ct.class.id === 1),
    }
];