
import { disciplineDTO, disciplineResumeDTO } from "@/dto/discipline";
import { api } from "@/lib/api";

export async function createDiscipline(discipline: disciplineDTO){
    const response = await api.post<disciplineDTO>('/discipline', discipline);
    return response.data;
}

export async function getDisciplineById(id: string){
    const response  = await api.get<disciplineResumeDTO>(`/discipline/${id}`);
    return response.data;
}

export async function getAllDiscipline(){
    const response  = await api.get<disciplineResumeDTO[]>('/discipline');
    return response.data;
}

export async function updateDiscipline(discipline: disciplineDTO ){
    const response = await api.put<disciplineDTO>(`/discipline/${discipline.id}`, discipline);
    return response.data;
}

export async function deleteDiscipline(id: string){
    const response = await api.delete(`/discipline/${id}`);
    return response.data;
}