import { lessonDTO } from "@/dto/lesson";
import { disciplines } from "./disciplines";

export const lessons: lessonDTO[] = [
    {
        id: 1,
        discipline: disciplines.filter(d => d.id === 1)[0],
        classNumber: 0,
        contentTitles: ['Nivelamento.'],
    },
    {
        id: 2,
        discipline: disciplines.filter(d => d.id === 1)[0],
        classNumber: 1,
        contentTitles: ['Ortografia oficial.'],
    },
    {
        id: 3,
        discipline: disciplines.filter(d => d.id === 1)[0],
        classNumber: 2,
        contentTitles: ['Classes de palavras: substantivo, adjetivo, pronomes, artigos, numerais, advérbios e interjeições.', 'Colocação de pronomes átonos.'],
    },
]