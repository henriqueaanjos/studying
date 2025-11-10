import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../Input";

import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { contestDTO } from "../../dto/contest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";;
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { createContest } from "@/services/contest.request";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const newContestSchema = yup.object({
    companyName: yup.string().required('Orgão é obrigatório'),
    position: yup.string().required('Cargo é obrigatório'),
    exameDate: yup.string().required('Data da prova é obrigatória'),
    dedicationHours: yup.number().min(0, 'As horas de dedicação devem ser maiores ou iguais a 0').optional(),
});

export function NewContestModal({ isOpen, onClose }: DialogProps) {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(newContestSchema)
    });

    const { mutateAsync: newContest } = useMutation({
        mutationFn: async (data: contestDTO) => {
            await createContest({ ...data });
        },
        onSuccess: (_, variables: contestDTO) => {
            queryClient.setQueryData(['contests'], (contests: contestDTO[]) => {
                return contests ? [...contests, variables] : [variables];
            })
            toast.success("Concurso criado com sucesso!");
            onClose();
        },
        onError: (error) => {
            console.error("Erro ao criar concurso:", error);
            toast.error("Erro ao criar concurso!");
        }
    })

    async function onSubmit(data: contestDTO) {
        const newData = {
            ...data,
            exameDate: new Date(data.exameDate).toISOString(),
        }
        await newContest(newData);
    }

    useEffect(() => {
        reset();
    }, [onClose, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-black flex flex-row gap-2 items-center">
                        <Plus size={20} />
                        Adicionar Novo Concurso
                    </DialogTitle>
                    <DialogDescription>
                        Adicione um novo alvo de estudos. Um concurso pode conter várias disciplinas e aulas.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Controller
                        name="companyName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Orgão"
                                placeholder="Nome do Orgão"
                                errors={errors.companyName?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        name="position"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Cargo"
                                placeholder="Cargo que deseja ocupar"
                                errors={errors.position?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        name="exameDate"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Data da Prova"
                                type='date'
                                errors={errors.exameDate?.message}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        name="dedicationHours"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Horas de Dedicação Diária"
                                type='number'
                                min={0}
                                placeholder="Ex: 4"
                                errors={errors.dedicationHours?.message}
                                onChange={e => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                value={value}
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