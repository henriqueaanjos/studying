
import { registerDTO, registerGetDTO } from "@/dto/register";
import { api } from "@/lib/api";

export async function createRegister(register: registerDTO){
    const response = await api.post<registerDTO>('/register', register);
    return response.data;
}

export async function getRegisterById(id: string){
    const response  = await api.get<registerGetDTO>(`/register/${id}`);
    return response.data;
}

export async function getAllRegister(){
    const response  = await api.get<registerGetDTO[]>('/register');
    return response.data;
}

export async function updateRegister(register: registerDTO ){
    const response = await api.put<registerDTO>(`/register/${register.id}`, register);
    return response.data;
}

export async function deleteRegister(id: string){
    const response = await api.delete(`/register/${id}`);
    return response.data;
}