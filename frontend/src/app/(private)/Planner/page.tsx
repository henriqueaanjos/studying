'use client'

import { NewContestModal } from "@/components/modals/newContest";
import { PrivateHeader } from "@/components/privateHeader";
import { StatisticsCard } from "@/components/StatisticsCard";
import { Button } from "@/components/ui/button";
import { useContest } from "@/hooks/useContest";
import { ContactRound, Plus } from "lucide-react";
import { useState } from "react";

export default function Planner() {
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { allContests } = useContest();

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }
    return (
        <main className="w-full min-h-screen p-8 flex flex-col">
            <PrivateHeader pageTitle="Planejamento" />
            {allContests && allContests.length > 0 ?
                <>
                    <div className="w-full mt-4">
                        <StatisticsCard title="Conteúdo Programado">
                            <h1>Teste</h1>
                        </StatisticsCard>
                    </div>
                    <div className="w-full mt-4">
                        <StatisticsCard title="Etapas do Planejamento">
                            <h1>Teste</h1>
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