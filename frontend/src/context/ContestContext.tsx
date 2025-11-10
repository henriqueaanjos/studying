'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import { contestDTO } from "@/dto/contest";
import { useQuery } from "@tanstack/react-query";
import { getAllContest } from "@/services/contest.request";

interface ContestContextProps {
    allContests?: contestDTO[];
    contest: contestDTO;
    onChangeContest: (contest: contestDTO) => void;
}

interface ContestContextProviderProps {
    children: ReactNode
}

export const ContestContext = createContext<ContestContextProps>({} as ContestContextProps);

export function ContestContextProvider({ children }: ContestContextProviderProps) {
    const { data: allContests } = useQuery({
        queryKey: ['contests'],
        queryFn: getAllContest,
    })

    const [contest, setContest] = useState<contestDTO>({} as contestDTO);

    function onChangeContest(contest: contestDTO) {
        setContest(contest);
        localStorage.setItem('contestID', JSON.stringify(contest) || '');
    }

    useEffect(() => {
        const storedContest = localStorage.getItem('contestID');
        if (storedContest) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setContest(JSON.parse(storedContest));
        }else if (allContests && allContests.length > 0) {
            setContest(allContests[0]);
        }
    }, [allContests]);

    return (
        <ContestContext.Provider
            value={{
                allContests,
                contest,
                onChangeContest
            }}
        >
            {children}
        </ContestContext.Provider>
    )
}