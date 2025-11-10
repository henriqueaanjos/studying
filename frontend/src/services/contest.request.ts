
import { contestDTO } from "@/dto/contest";
import { api } from "@/lib/api";

export async function createContest(contest: contestDTO){
    const response = await api.post<contestDTO>('/contest', contest);
    return response.data;
}

export async function getContestById(id: string){
    const response  = await api.get<contestDTO>(`/contest/${id}`);
    return response.data;
}

export async function getAllContest(){
    const response  = await api.get<contestDTO[]>('/contest');
    return response.data;
}

export async function updateContest(contest: contestDTO ){
    const response = await api.put<contestDTO>(`/contest/${contest.id}`, contest);
    return response.data;
}

export async function deleteContest(id: string){
    const response = await api.delete(`/contest/${id}`);
    return response.data;
}