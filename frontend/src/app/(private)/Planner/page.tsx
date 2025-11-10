import { PrivateHeader } from "@/components/privateHeader";
import { StatisticsCard } from "@/components/StatisticsCard";

export default function Planner() {
    return (
        <main className="w-full min-h-screen p-8">
            <PrivateHeader pageTitle="Planejamento" />
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
        </main>
    )
}