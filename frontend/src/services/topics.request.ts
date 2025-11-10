
import { topicDTO } from "@/dto/topic";
import { api } from "@/lib/api";

export async function createTopic(topic: topicDTO){
    const response = await api.post<topicDTO>('/topic', topic);
    return response.data;
}

export async function getTopicById(id: string){
    const response  = await api.get<topicDTO>(`/topic/${id}`);
    return response.data;
}

export async function getAllTopic(){
    const response  = await api.get<topicDTO[]>('/topic');
    return response.data;
}

export async function updateTopic(topic: topicDTO ){
    const response = await api.put<topicDTO>(`/topic/${topic.id}`, topic);
    return response.data;
}

export async function deleteTopic(id: string){
    const response = await api.delete(`/topic/${id}`);
    return response.data;
}