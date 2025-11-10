'use client'
import { BookA, BookOpenCheck, ChevronDown, FileVideoCamera, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { NewDisciplineModal } from "./modals/newDiscipline";
import { NewLessonModal } from "./modals/newLesson";
import { NewContentModal } from "./modals/newContent";
import { NewContestModal } from "./modals/newContest";
import { useContest } from "@/hooks/useContest";

type Props = {
    pageTitle: string;
}

export function PrivateHeader({ pageTitle }: Props) {
    const [showNewDisciplineModal, setShowNewDisciplineModal] = useState(false);
    const [showNewLessonModal, setShowNewLessonModal] = useState(false);
    const [showNewContentModal, setShowNewContentModal] = useState(false);
    const [showNewContestModal, setShowNewContestModal] = useState(false);

    const { allContests, contest, onChangeContest } = useContest();

    function handleOpenNewDisciplineModal() {
        setShowNewDisciplineModal(true)
    }
    function handleCloseNewDisciplineModal() {
        setShowNewDisciplineModal(false)
    }

    function handleOpenNewLessonModal() {
        setShowNewLessonModal(true)
    }
    function handleCloseNewLessonModal() {
        setShowNewLessonModal(false)
    }

    function handleOpenNewContentModal() {
        setShowNewContentModal(true)
    }
    function handleCloseNewContentModal() {
        setShowNewContentModal(false)
    }

    function handleOpenNewContestModal() {
        setShowNewContestModal(true)
    }
    function handleCloseNewContestModal() {
        setShowNewContestModal(false)
    }


    return (
        <header className="w-full flex flex-row items-center justify-between mb-8">
            <h1 className="text-4xl font-black">{pageTitle}</h1>
            <div className="flex items-center justify-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline'>{allContests && allContests.length > 0 ?
                            `${contest.position} - ${contest.companyName}`
                            : 'Selecione o Concurso'
                        }
                            <ChevronDown size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {allContests && allContests.filter(c => c.id !== contest.id).map((cont) =>
                            <DropdownMenuItem key={cont.id} onSelect={() => onChangeContest(cont)}>
                                {cont.position} - {cont.companyName}
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onSelect={handleOpenNewContestModal}>
                            <Plus size={16} />
                            Adicionar novo Concurso
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost'>
                                <Plus size={16} className="text-primary" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={handleOpenNewDisciplineModal}>
                                <BookA size={16} className="mr-2" />
                                Adicionar Disciplina
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleOpenNewLessonModal}>
                                <BookOpenCheck size={16} className="mr-2" />
                                Adicionar Aula
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleOpenNewContentModal}>
                                <FileVideoCamera size={16} className="mr-2" />
                                Adicionar Conteúdo
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <NewDisciplineModal isOpen={showNewDisciplineModal} onClose={handleCloseNewDisciplineModal} />
            <NewLessonModal isOpen={showNewLessonModal} onClose={handleCloseNewLessonModal} />
            <NewContentModal isOpen={showNewContentModal} onClose={handleCloseNewContentModal} />
            <NewContestModal isOpen={showNewContestModal} onClose={handleCloseNewContestModal} />
        </header >
    )
}