'use client'

import { NewContestModal } from "@/components/modals/newContest";
import { PrivateHeader } from "@/components/privateHeader";
import { StatisticsCard } from "@/components/StatisticsCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContest } from "@/hooks/useContest";
import { getAllRegister } from "@/services/register.request";
import { formatDate } from "@/utils/formatDate";
import { formatDuration } from "@/utils/formatDuration";
import { useQuery } from "@tanstack/react-query";
import { ContactRound, Plus } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { allContests } = useContest();

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }

    const { data: groupedRegisters } = useQuery({
        queryKey: ['registers'],
        queryFn: getAllRegister,
        select: (registers) => {
            const map = new Map<string, typeof registers>();

            for (const register of registers) {
                const date = new Date(register.registeredAt).toISOString().split('T')[0];
                if (!map.has(date)) map.set(date, []);
                map.get(date)!.push(register);
            }
            return Array.from(map, ([date, items]) => ({
                date,
                registers: items,
            }));
        },
    });

    function bestSequence() {
        if (!groupedRegisters || groupedRegisters.length === 0) return 0;

        // Extrai e ordena as datas em ordem crescente
        const dates = groupedRegisters
            .map(g => new Date(g.date))
            .sort((a, b) => a.getTime() - b.getTime());

        let currentStreak = 0;
        let bestStreak = 0;

        for (let i = 0; i < dates.length; i++) {
            const current = dates[i];
            const previous = dates[i - 1];

            // Ignora sábados e domingos
            const dayOfWeek = current.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) continue;

            if (
                i > 0 &&
                previous &&
                current.getDay() !== 0 && // não domingo
                previous.getDay() !== 6 && // não sábado
                (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24) === 1
            ) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }

            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
            }
        }

        return bestStreak;
    };


    return (
        <main className="w-full min-h-screen p-8 flex flex-col">
            <PrivateHeader pageTitle="Registro de Rotina" />
            {allContests && allContests.length > 0 ?
                <>
                    <div className="w-full flex flex-row gap-4 mt-4">
                        <StatisticsCard title="Dias de Estudo">
                            <h1 className="text-7xl font-black">{groupedRegisters ? groupedRegisters.length : 0}</h1>
                        </StatisticsCard>
                        <StatisticsCard title="Média de Horas p/dia">
                            <h1 className="text-7xl font-black">{
                                groupedRegisters && groupedRegisters.length > 0 ?
                                    formatDuration((groupedRegisters?.reduce(
                                        (sum, group) =>
                                            sum +
                                            group.registers.reduce((acc, r) => acc + (r.content.durationSeconds || 0), 0),
                                        0
                                    ) || 0) / groupedRegisters!.length)
                                    : '00:00:00'
                            }
                            </h1>
                        </StatisticsCard>
                        <StatisticsCard title="Melhor Sequência">
                            <h1 className="text-7xl font-black">{bestSequence()}</h1>
                        </StatisticsCard>
                    </div>
                    <div className="w-full mt-4">
                        <StatisticsCard title="Registro de Aulas">
                            <Table className="w-full">
                                <TableCaption>Suas sessões de estudo. Continue assim!</TableCaption>
                                <TableHeader>
                                    <TableRow className="grid grid-cols-3">
                                        <TableHead className="flex justify-center">Data</TableHead>
                                        <TableHead className="flex justify-center">Total de Conteúdos Cobertos</TableHead>
                                        <TableHead className="flex justify-center">Tempo de Estudo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {groupedRegisters && groupedRegisters.length > 0 && groupedRegisters.map((register) => (
                                        <TableRow key={register.date} className="grid grid-cols-3">
                                            <TableCell className="flex justify-center">{formatDate(register.date)}</TableCell>
                                            <TableCell className="flex justify-center">{register.registers.length}</TableCell>
                                            <TableCell className="flex justify-center font-medium">
                                                {formatDuration(
                                                    register.registers.reduce((sum, r) => sum + (r.content.durationSeconds || 0), 0)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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