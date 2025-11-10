import { UserDTO } from "@/dto/user";
import { api } from "@/lib/api";

export async function getAllUsers(){
    const response  = await api.get<UserDTO[]>('/users');
    return response.data;
}

export async function updateUser(user: UserDTO ){
    const response = await api.put<UserDTO>(`/users/${user.id}`, user);
    return response.data;
}

export async function deleteUser(id: string){
    const response = await api.delete(`/users/${id}`);
    return response.data;
}