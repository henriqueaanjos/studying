'use client'

import { NewContestModal } from "@/components/modals/newContest";
import { PrivateHeader } from "@/components/privateHeader";
import { StatisticsCard } from "@/components/StatisticsCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { registerDTO } from "@/dto/register";
import { sessionDTO } from "@/dto/session";
import { useContest } from "@/hooks/useContest";
import { queryClient } from "@/lib/react-query";
import { createRegister } from "@/services/register.request";
import { generateSession } from "@/services/session.request";
import { formatDuration } from "@/utils/formatDuration";
import { getStageIcon } from "@/utils/getStageIcon";
import { getTextColor } from "@/utils/getTextColor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContactRound, FileText, Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Today() {
    const [remainingContents, setRemainingContents] = useState(0);
    const [remainingTime, setRemainingTime] = useState('00:00:00');
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { contest, allContests } = useContest();

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }


    const { data: session } = useQuery({
        queryKey: ['TodaySession', contest?.id],
        enabled: !!contest,
        queryFn: async () => {
            return await generateSession(contest.id)
        },
    })

    const { mutateAsync: newRegister } = useMutation({
        mutationFn: async (data: registerDTO) => {
            await createRegister({ ...data });
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: ['TodaySession', contest?.id] });
            const previousSession = queryClient.getQueryData<sessionDTO[]>(['TodaySession', contest?.id]);

            // Atualização otimista
            const updatedSession = previousSession?.map((item) =>
                item.id === data.contentId
                    ? {
                        ...item,
                        Register:
                            item.Register.length > 0 ? [] : [{ id: 'temp', contentId: data.contentId }],
                    }
                    : item
            ) || [];

            // Atualiza o cache
            queryClient.setQueryData(['TodaySession', contest.id], updatedSession);

            // 👇 Recalcula valores locais instantaneamente
            const remaining = updatedSession.filter((s) => s.Register.length === 0);
            const remainingContentsCount = remaining.length;
            const remainingTimeSeconds = remaining.reduce((acc, curr) => acc + curr.durationSeconds, 0);

            setRemainingContents(remainingContentsCount);
            setRemainingTime(formatDuration(remainingTimeSeconds));

            return { previousSession };
        },
        onError: (_err, _data, context) => {
            if (context?.previousSession) {
                queryClient.setQueryData(['TodaySession'], context.previousSession);
            }
            toast.error('Erro ao registrar conteúdo!');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['TodaySession', contest?.id] });
        },
        onSuccess: () => {
            toast.success('Conteúdo atualizado!');
        },
    });

    function onCheckRegister(register: { contentId: string }) {
        newRegister(register);
    }

    useEffect(() => {
        if (session) {
            const remaining = session.filter((s) => s.Register.length === 0);
            const remainingContentsCount = remaining.length;
            const remainingTimeSeconds = remaining.reduce((acc, curr) => acc + curr.durationSeconds, 0);
            setRemainingContents(remainingContentsCount);
            setRemainingTime(formatDuration(remainingTimeSeconds));
        }
    }, [session])

    return (
        <main className="w-full min-h-screen p-8 flex flex-col">
            <PrivateHeader pageTitle="Tarefas de Hoje" />
            {allContests && allContests.length > 0 ?
                <>
                    <div className="w-full flex flex-row gap-4 mt-4">
                        <StatisticsCard title="Conteúdos Restante p/Hoje">
                            <h1 className="text-7xl font-black">{remainingContents}</h1>
                        </StatisticsCard>
                        <StatisticsCard title="Tempo Restante p/Hoje">
                            <h1 className="text-7xl font-black">
                                {remainingTime}
                            </h1>
                        </StatisticsCard>
                    </div>
                    <div className="w-full mt-4">
                        <StatisticsCard title="Hoje">
                            {!session || session.length === 0 ?
                                <h1 className="uppercase text-xs font-bold">Cadastre alguns conteúdos para ver a sua programação!</h1>
                                :
                                <Table className="w-full">
                                    <TableCaption>Por Hoje é só, arrebenta campeão!</TableCaption>
                                    <TableHeader>
                                        <TableRow className="grid grid-cols-7">
                                            <TableHead className="flex justify-center">Etapa de estudo</TableHead>
                                            <TableHead className="flex justify-center">Disciplina</TableHead>
                                            <TableHead className="flex justify-center">Aula</TableHead>
                                            <TableHead className="flex justify-center">Tipo de Conteúdo</TableHead>
                                            <TableHead className="flex justify-center">Nº do Conteúdo</TableHead>
                                            <TableHead className="flex justify-center">Duração</TableHead>
                                            <TableHead className="flex justify-center">Assistido</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {session && session.map((section) => (
                                            <TableRow key={section.id} className="grid grid-cols-7 items-center m-2 rounded-md"
                                                style={{
                                                    backgroundColor: section.disciplineColor,
                                                    color: getTextColor(section.disciplineColor),
                                                }}
                                            >
                                                <TableCell className="flex justify-center">{getStageIcon(section.stageName)}</TableCell>
                                                <TableCell className="flex justify-center font-bold">{section.disciplineName}</TableCell>
                                                <TableCell className="flex justify-center">{section.numberLesson}</TableCell>
                                                <TableCell className="flex justify-center">{section.contentTypeName === 'video' ?
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Video />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Video
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    : <Tooltip>
                                                        <TooltipTrigger>
                                                            <FileText />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            PDF
                                                        </TooltipContent>
                                                    </Tooltip>
                                                }
                                                </TableCell>
                                                <TableCell className="flex justify-center">{section.numberContent}</TableCell>
                                                <TableCell className="flex justify-center">{formatDuration(section.durationSeconds)}</TableCell>
                                                <TableCell className="flex justify-center">
                                                    <Checkbox
                                                        checked={section.Register.length > 0}
                                                        className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-500 w-6 h-6 bg-slate-200 dark:bg-slate-700 transition-all duration-300 text-white dark:text-white "
                                                        onClick={() => onCheckRegister({
                                                            contentId: section.id,
                                                        })}
                                                    />
                                                </TableCell>
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