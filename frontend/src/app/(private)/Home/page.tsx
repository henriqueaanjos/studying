'use client'

import { NewContestModal } from "@/components/modals/newContest";
import { PrivateHeader } from "@/components/privateHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { StatisticsCard } from "@/components/StatisticsCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { sessionDTO } from "@/dto/session";
import { useContest } from "@/hooks/useContest";
import { getAllDiscipline } from "@/services/discipline.request";
import { getAllLesson } from "@/services/lesson.request";
import { generateSession } from "@/services/session.request";
import { formatDate } from "@/utils/formatDate";
import { formatDuration } from "@/utils/formatDuration";
import { getTextColor } from "@/utils/getTextColor";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, ContactRound, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type GroupedLesson = {
    key: string;
    disciplineName: string;
    disciplineColor: string;
    numberLesson: number;
    numberStartContent: number;
    numberEndContent: number;
    remainingDurationSeconds: number;
    totalDurationSeconds: number;
};

export default function Home() {
    const [daysLeft, setDaysLeft] = useState(0);
    const [totalTodayDuration, setTotalTodayDuration] = useState('00:00:00');
    const [totalTime, setTotalTime] = useState(0);
    const [totalTimeCompleted, setTotalTimeCompleted] = useState(0);
    const [totalContentsCompleted, setTotalContentsCompleted] = useState(0);
    const [totalLessonsCompleted, setTotalLessonsCompleted] = useState(0);
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { contest, allContests } = useContest();

    const { data: groupLesson } = useQuery({
        queryKey: ['TodaySession'],
        enabled: !!contest?.id, 
        queryFn: async () => {
            return await generateSession(contest.id)
        },
        select: (session: sessionDTO[]) => {
            return session.reduce((acc: GroupedLesson[], content: sessionDTO) => {
                const key = `${content.disciplineName}-${content.numberLesson}`;
                const existing = acc.find((i) => i.key === key);

                const duration = content.durationSeconds || 0;
                const isRegistered = content.Register?.length > 0;

                if (existing) {
                    existing.numberStartContent = Math.min(
                        existing.numberStartContent,
                        content.numberContent
                    );
                    existing.numberEndContent = Math.max(
                        existing.numberEndContent,
                        content.numberContent
                    );
                    existing.remainingDurationSeconds += isRegistered ? 0 : duration;
                    existing.totalDurationSeconds += duration;
                } else {
                    acc.push({
                        key,
                        disciplineName: content.disciplineName,
                        disciplineColor: content.disciplineColor,
                        numberLesson: content.numberLesson,
                        numberStartContent: content.numberContent,
                        numberEndContent: content.numberContent,
                        remainingDurationSeconds: isRegistered ? 0 : duration,
                        totalDurationSeconds: content.durationSeconds,
                    });
                }

                return acc;
            }, []);
        }
    })

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }

    const { data: disciplines } = useQuery({
        queryKey: ['disciplines'],
        enabled: !!contest?.id, 
        queryFn: getAllDiscipline,
    })
    const { data: lessons } = useQuery({
        queryKey: ['lessons'],
        enabled: !!contest?.id, 
        queryFn: getAllLesson,
    })

    useEffect(() => {
        const today = new Date();
        const examDate = new Date(contest.exameDate);
        const diffTime = examDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays);
    }, [contest]);

    useEffect(() => {
        if (groupLesson && groupLesson.length > 0) {
            const totalSeconds = groupLesson.reduce((acc, lesson) => acc + lesson.totalDurationSeconds, 0);
            setTotalTodayDuration(formatDuration(totalSeconds));
        }
    }, [groupLesson]);

    useEffect(() => {
        if (disciplines && disciplines.length > 0) {
            const totalTimeStudied = disciplines.reduce((acc, discipline) => acc + discipline.completedDuration, 0);
            const totalTime = disciplines.reduce((acc, discipline) => acc + discipline.totalDuration, 0);
            const totalContentsCompleted = disciplines.reduce((acc, discipline) => acc + discipline.completedContents, 0);
            setTotalTime(totalTime);
            setTotalTimeCompleted(totalTimeStudied);
            setTotalContentsCompleted(totalContentsCompleted);
        }
    }, [disciplines])

    useEffect(() => {
        if (lessons && lessons.length > 0) {
            const totalLessonsCompleted = lessons.filter(lesson => lesson.completedContents === lesson.totalContents).length;
            setTotalLessonsCompleted(totalLessonsCompleted);
        }
    }, [lessons])

    return (
        <main className="w-full min-h-screen p-8 flex flex-col">
            <PrivateHeader pageTitle="Dashboard de Estudos" />
            {allContests &&
                allContests.length > 0 ?
                    <>
                        <StatisticsCard title="Progresso">
                            {totalTime === 0 ?
                                <h1 className="uppercase text-xs font-bold">Cadastre alguns conteúdos para ver o progresso!</h1>
                                :
                                <ProgressBar progress={((totalTimeCompleted / totalTime) * 100)} />
                            }
                        </StatisticsCard>
                        <div className="w-full flex flex-row gap-4 mt-4">
                            <StatisticsCard title="Total de Aulas Assistidas">
                                <h1 className="text-7xl font-black">{totalLessonsCompleted}</h1>
                            </StatisticsCard>
                            <StatisticsCard title="Conteúdos Cobertos">
                                <h1 className="text-7xl font-black">{totalContentsCompleted}</h1>
                            </StatisticsCard>
                            <StatisticsCard title="Horas totais já Assistidas">
                                <h1 className="text-7xl font-black">{formatDuration(totalTimeCompleted)}</h1>
                            </StatisticsCard>
                        </div>
                        <div className="w-full mt-4">
                            {totalTime > 0 &&
                                <StatisticsCard title="Hoje">
                                <div className="w-full grid grid-cols-3 gap-6">
                                    <div className="w-full col-span-2 flex flex-col gap-2">
                                        <div className="w-full grid grid-cols-8 items-center font-bold text-xxs gap-2">
                                            <div className="col-span-4" />
                                            <span className="flex items-center justify-center text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-t-md">Aula</span>
                                            <span className="flex items-center justify-center text-center bg-slate-100 dark:bg-slate-700  p-2 rounded-t-md">Conteúdo Inicial</span>
                                            <span className="flex items-center justify-center text-center bg-slate-100 dark:bg-slate-700  p-2 rounded-t-md">Conteúdo Final</span>
                                            <span className="flex items-center justify-center text-center bg-slate-100 dark:bg-slate-700  p-2 rounded-t-md rounded-r-md">Tempo Restante</span>
                                        </div>
                                        {groupLesson ?
                                            groupLesson.map((lesson) => (
                                                <div className="w-full col-span-2 grid grid-cols-8 gap-2 items-center justify-center border-2 rounded-md " key={lesson.key}
                                                    style={{
                                                        borderColor: lesson.disciplineColor,
                                                    }}
                                                >
                                                    <h2 className="col-span-4 font-black text-sm flex items-center justify-center px-4 py-2 rounded-l-sm "
                                                        style={{
                                                            backgroundColor: lesson.disciplineColor,
                                                            color: getTextColor(lesson.disciplineColor),
                                                        }}
                                                    >{lesson.disciplineName}</h2>
                                                    <span className="flex items-center justify-center text-sm font-bold">{lesson.numberLesson}</span>
                                                    <span className="flex items-center justify-center text-sm font-bold">{lesson.numberStartContent}</span>
                                                    <span className="flex items-center justify-center text-sm font-bold">{lesson.numberEndContent}</span>
                                                    <span className="flex items-center justify-center text-sm font-bold">{formatDuration(lesson.remainingDurationSeconds)}</span>
                                                </div>
                                            ))
                                            :
                                            <div className="w-full flex items-center justify-center">
                                                <Spinner className="size-8" />
                                            </div>
                                        }
                                    </div>
                                    <div className="px-2 flex flex-col">
                                        <span className="text-xs font-bold">Horas Gastas</span>
                                        <div className="flex h-full items-end justify-center">
                                            <h1 className="text-7xl font-black text-primary">{
                                                groupLesson && groupLesson.length > 0 &&
                                                formatDuration(
                                                    groupLesson.reduce((acc, lesson) => acc + lesson.totalDurationSeconds, 0) -
                                                    groupLesson.reduce((acc, lesson) => acc + lesson.remainingDurationSeconds, 0)
                                                )}</h1>
                                            <h3 className="text-lg font-black mb-2 text-slate-400 dark:text-slate-600 ">/ {totalTodayDuration}</h3>
                                        </div>
                                    </div>
                                </div>
                            </StatisticsCard>
                            }
                        </div>
                        <div className="w-full mt-4">
                            <StatisticsCard title="Previsão">
                                <div className="w-full grid grid-cols-3 gap-6">
                                    <div className="px-2 flex flex-col">
                                        <span className="text-xs font-bold">Dias Restantes</span>
                                        <div className="flex h-full items-center justify-center">
                                            <h1 className={`${daysLeft < 0 ? 'text-2xl' : 'text-7xl'} font-black`}>{
                                                daysLeft < 0 ?
                                                    <div className="flex flex-col items-center justify-center text-center">
                                                        <CheckCircle size={48} className="text-green-500" />
                                                        Concurso já realizado!
                                                    </div>
                                                    : Math.ceil((new Date(contest.exameDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                                            }</h1>
                                        </div>
                                    </div>
                                    <div className="px-2 flex flex-col">
                                        <span className="text-xs font-bold">Horas Necessárias p/dia</span>
                                        <div className="flex h-full py-8 items-center justify-center">
                                            <h1 className={`${daysLeft < 0 ? 'text-2xl' : 'text-7xl'} font-black`}>
                                                {disciplines ?
                                                    daysLeft < 0 ?
                                                        <div className="flex flex-col items-center justify-center text-center">
                                                            <CheckCircle size={48} className="text-green-500" />
                                                            Concurso já realizado!
                                                        </div>
                                                        : formatDuration(Math.ceil(disciplines.reduce((acc, discipline) => acc + discipline.totalDuration, 0) / (daysLeft * 3600)))
                                                    :
                                                    <div className="w-full flex items-center justify-center">
                                                        <Spinner className="size-8" />
                                                    </div>
                                                }
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="px-2 flex flex-col">
                                        <span className="text-xs font-bold">Data da Prova</span>
                                        <div className="flex h-full items-center justify-center">
                                            <h1 className="text-7xl font-black">{formatDate(contest.exameDate)}</h1>
                                        </div>
                                    </div>
                                </div>
                            </StatisticsCard>
                        </div>
                    </>
                    :
                    <div className="w-full flex-1 flex flex-col items-center justify-center">
                        <ContactRound size={48} className="text-slate-500" />
                        <h1 className="text-4xl font-bold text-center mb-4">Você não possui concursos cadastrados!</h1>
                        <h3 className="text-center text-slate-500 mb-8">Para começar a utilizar o Estudei, por favor cadastre um concurso.</h3>
                        <Button onClick={handleOpenNewContestModal}>
                            <Plus size={16} />
                            Adicionar novo Concurso
                        </Button>
                        <NewContestModal isOpen={showNewContestModal} onClose={handleCloseNewContestModal} />
                    </div>
            }

        </main>
    )
}