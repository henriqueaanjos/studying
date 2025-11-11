import { BookOpenCheck, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Select } from "../Select";
import { Input } from "../Input";
import { MultiSelectInput } from "../MultiSelectInput";
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { lessonDTO } from "@/dto/lesson";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLesson } from "@/services/lesson.request";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { createTopic } from "@/services/topics.request";
import { getAllDiscipline } from "@/services/discipline.request";
import { useEffect } from "react";
import { useContest } from "@/hooks/useContest";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const lessonSchema = yup.object({
    disciplineId: yup.string().required("A disciplina é obrigatória"),
    numberLesson: yup.number().required("O número da aula é obrigatório").min(0, "O número da aula deve ser maior ou igual a 0"),
    topics: yup.array().of(yup.string()).min(1, "Adicione ao menos um conteúdo").required("Os conteúdos da aula são obrigatórios"),
})

export function NewLessonModal({ isOpen, onClose }: DialogProps) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(lessonSchema),
    })

    const { contest } = useContest();

    const { mutateAsync: newLesson } = useMutation({
        mutationFn: async (data: lessonDTO) => {
            const createdLesson = await createLesson({ ...data, stageId: 'db926533-ac52-4b16-87fe-bec71c1cff00' });

            await Promise.all(
                data.topics.map(async (name) => {
                    await createTopic({
                        lessonId: createdLesson.id,
                        name,
                    });
                })
            );

            return createdLesson;
        },
        onSuccess: (_, variables: lessonDTO) => {
            queryClient.setQueryData(['lessons'], (lessons: lessonDTO[]) => {
                return lessons ? [...lessons, variables] : [variables];
            })
            toast.success("Aula criada com sucesso!");
            onClose();
        },
        onError: (error) => {
            console.error("Erro ao criar aula:", error);
            toast.error("Erro ao criar aula!");
        }
    })

    async function onSubmit(data: lessonDTO) {
        await newLesson(data);
    }

    const { data: disciplines } = useQuery({
        queryKey: ['disciplines'],
        enabled: !!contest?.id, 
        queryFn: getAllDiscipline,
    })

    useEffect(() => {
        reset();
    }, [onClose, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-black flex flex-row gap-2 items-center">
                        <BookOpenCheck size={20} />
                        Adicionar Aula
                    </DialogTitle>
                    <DialogDescription>
                        Adicione uma nova aula à uma disciplina.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Controller
                        control={control}
                        name="disciplineId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Disciplina"
                                placelholder="Selecione a disciplina"
                                items={disciplines && disciplines.length > 0 ?
                                    disciplines.map(discipline =>
                                        ({ label: discipline.name, value: discipline.id })
                                    )
                                    : []
                                }
                                onValueChange={onChange}
                                value={value}
                                errors={errors.disciplineId?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="numberLesson"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Número da Aula"
                                type="number"
                                placeholder='0'
                                min={0}
                                required
                                onChange={e => onChange(e.target.value === '' ? 0 : e.target.value)}
                                value={value}
                                errors={errors.numberLesson?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="topics"
                        render={({ field: { onChange, value } }) => (
                            <MultiSelectInput
                                label='Conteúdos da Aula'
                                placeholder='Adicione os conteúdos abordados na aula'
                                onChange={onChange}
                                value={value}
                                errors={errors.topics?.message}
                            />
                        )}
                    />
                </form>
                <DialogFooter>
                    <Button className="text-white" onClick={handleSubmit(onSubmit)}>
                        <Plus size={16} />
                        Adicionar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}