
import { contentDTO } from "@/dto/content";
import { api } from "@/lib/api";

export async function createContent(content: contentDTO){
    const response = await api.post<contentDTO>('/content', content);
    return response.data;
}

export async function getContentById(id: string){
    const response  = await api.get<contentDTO>(`/content/${id}`);
    return response.data;
}

export async function getAllContent(){
    const response  = await api.get<contentDTO[]>('/content');
    return response.data;
}

export async function updateContent(content: contentDTO ){
    const response = await api.put<contentDTO>(`/content/${content.id}`, content);
    return response.data;
}

export async function deleteContent(id: string){
    const response = await api.delete(`/content/${id}`);
    return response.data;
}