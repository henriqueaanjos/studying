

import { contentDTO } from "@/dto/content";
import { sessionDTO } from "@/dto/session";
import { api } from "@/lib/api";

export async function generateSession(contestId: string){
    const response = await api.get<sessionDTO[]>(`/study-session/${contestId}/session`);
    return response.data;
}

export async function generateStudyPlan(contestId: string){
    const response  = await api.get<contentDTO[]>(`/study-session/${contestId}/plan`);
    return response.data;
}

export async function generateSessionByDate(contestId: string, date: string){
    const response  = await api.get<contentDTO[]>(`/study-session/${contestId}/by-date`, {
        params: {
            date
        }
    });
    return response.data;
}

