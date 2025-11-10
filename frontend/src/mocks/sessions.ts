import { sessionDTO } from "@/dto/session";
import { blocks } from "./blocks";

export const sessions: sessionDTO[] = [
    {
        id: 1,
        blocks: blocks.filter(b => b.id === 1),
        data: new Date('2024-06-20'),
    },
    {
        id: 2,
        blocks: blocks.filter(b => b.id === 2),
        data: new Date('2024-06-21'),
    },
]

