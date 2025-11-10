import { ContestContext } from "@/context/ContestContext";
import { useContext } from "react";

export function useContest(){
    return useContext(ContestContext);
}