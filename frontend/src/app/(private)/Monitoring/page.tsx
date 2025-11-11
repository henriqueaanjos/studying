'use client'

import { NewContestModal } from "@/components/modals/newContest";
import { PrivateHeader } from "@/components/privateHeader";
import { StatisticsCard } from "@/components/StatisticsCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useContest } from "@/hooks/useContest";
import { getAllDiscipline } from "@/services/discipline.request";
import { getAllLesson } from "@/services/lesson.request";
import { formatDuration } from "@/utils/formatDuration";
import { getTextColor } from "@/utils/getTextColor";
import { useQuery } from "@tanstack/react-query";
import { ContactRound, FileText, Plus, Video } from "lucide-react";
import { useState } from "react";

export default function Monitoring() {
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { allContests, contest } = useContest();

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }

    const { data: disciplines } = useQuery({
        queryKey: ['disciplines'],
        enabled: !!contest,
        queryFn: getAllDiscipline,
    })

    const { data: lessons } = useQuery({
        queryKey: ['lessons'],
        enabled: !!contest,
        queryFn: getAllLesson,
    })


    return (
        <main className="w-full min-h-screen p-8 flex flex-col">
            <PrivateHeader pageTitle="Acompanhamento de Disciplinas" />
            {allContests && allContests.length > 0 ? <>
                <div className="w-full mt-4">
                    <StatisticsCard title="Resumo das Disciplinas">
                        {!disciplines || disciplines.length === 0 ?
                            <h1 className="uppercase text-xs font-bold">Cadastre algumas Disciplinas para ver o Resumo!</h1>
                            :
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="grid grid-cols-5 border-primary">
                                        <TableHead className="flex justify-center">Disciplina</TableHead>
                                        <TableHead className="flex justify-center">Total de Aulas</TableHead>
                                        <TableHead className="flex justify-center">Total de Conteúdos</TableHead>
                                        <TableHead className="flex justify-center">Duração Total</TableHead>
                                        <TableHead className="flex justify-center">Duração Restante</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {disciplines && disciplines.map((discipline, index) => (
                                        <TableRow key={`${discipline.id}-${index}`} className="grid grid-cols-5 m-2 rounded-md"
                                            style={{
                                                backgroundColor: discipline.color,
                                                color: getTextColor(discipline.color),
                                            }}
                                        >
                                            <TableCell className="flex justify-center font-bold">{discipline.name}</TableCell>
                                            <TableCell className="flex justify-center">{discipline.totalLessons}</TableCell>
                                            <TableCell className="flex justify-center">{discipline.totalContents}</TableCell>
                                            <TableCell className="flex justify-center font-medium">{formatDuration(discipline.totalDuration)}</TableCell>
                                            <TableCell className="flex justify-center font-medium">{formatDuration(discipline.totalDuration - discipline.completedDuration)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
                    </StatisticsCard>
                </div>
                <div className="w-full mt-4">
                    <StatisticsCard title="Resumo das Aulas">
                        {!lessons || lessons.length === 0 ?
                            <h1 className="uppercase text-xs font-bold">Cadastre algumas Aulas para ver o Resumo!</h1>
                            :
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="grid grid-cols-6 border-primary">
                                        <TableHead className="flex justify-center">Disciplina</TableHead>
                                        <TableHead className="flex justify-center">Aula</TableHead>
                                        <TableHead className="flex justify-center">Tipo de conteúdo</TableHead>
                                        <TableHead className="flex justify-center">Duração Total</TableHead>
                                        <TableHead className="flex justify-center">Total de conteúdos</TableHead>
                                        <TableHead className="flex justify-center">Conteúdos cobertos</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lessons && lessons.length > 0 && lessons.map((lesson) => (
                                        <TableRow key={lesson.id} className="grid grid-cols-6 m-2">
                                            <TableCell className="flex justify-center font-bold rounded-md"
                                                style={{
                                                    backgroundColor: lesson.discipline ? lesson.discipline.color : '#ffffff',
                                                    color: lesson.discipline ? getTextColor(lesson.discipline.color) : '#000000',
                                                }}
                                            >{lesson.discipline ? lesson.discipline.name : ''}</TableCell>
                                            <TableCell className="flex justify-center">{lesson.numberLesson}</TableCell>
                                            <TableCell className="flex justify-center gap-2">{lesson.contentTypes && lesson.contentTypes.includes('pdf') &&
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <FileText />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        PDF
                                                    </TooltipContent>
                                                </Tooltip>
                                            }
                                                <div className="w-0.5 bg-slate-400 dark:bg-slate-600" />
                                                {lesson.contentTypes && lesson.contentTypes.includes('video') &&
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Video />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Video
                                                        </TooltipContent>
                                                    </Tooltip>
                                                }</TableCell>
                                            <TableCell className="flex justify-center font-medium">{formatDuration(lesson.totalDuration)}</TableCell>
                                            <TableCell className="flex justify-center font-medium">{lesson.totalContents}</TableCell>
                                            <TableCell className="flex justify-center font-medium">{lesson.completedContents}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
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