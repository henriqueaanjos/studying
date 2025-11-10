import { contentDTO } from "./content";

export type registerDTO = {
    id?: string;
    contentId: string;
}

export type registerGetDTO = {
    id?: string;
    registeredAt: string;
    content: contentDTO;
}