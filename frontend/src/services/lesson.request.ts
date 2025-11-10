
import { lessonDTO, lessonResumeDTO } from "@/dto/lesson";
import { api } from "@/lib/api";

export async function createLesson(lesson: lessonDTO){
    const response = await api.post<lessonDTO>('/lesson', lesson);
    return response.data;
}

export async function getLessonById(id: string){
    const response  = await api.get<lessonResumeDTO>(`/lesson/${id}`);
    return response.data;
}

export async function getAllLesson(){
    const response  = await api.get<lessonResumeDTO[]>('/lesson');
    console.log(response.data);
    return response.data;
}

export async function updateLesson(lesson: lessonDTO ){
    const response = await api.put<lessonDTO>(`/lesson/${lesson.id}`, lesson);
    return response.data;
}

export async function deleteLesson(id: string){
    const response = await api.delete(`/lesson/${id}`);
    return response.data;
}