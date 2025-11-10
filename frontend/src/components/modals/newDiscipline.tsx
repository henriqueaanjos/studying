import { BookA, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../Input";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../ui/button";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { disciplineDTO } from "@/dto/discipline";
import Color from "color";
import { useMutation } from "@tanstack/react-query";
import { createDiscipline } from "@/services/discipline.request";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { useContest } from "@/hooks/useContest";
import { useEffect } from "react";

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const disciplineSchema = yup.object({
    name: yup.string().required("O nome da disciplina é obrigatório"),
    color: yup.string().required("A cor da disciplina é obrigatória"),
});

export function NewDisciplineModal({ isOpen, onClose }: DialogProps) {

    const { control, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(disciplineSchema),
    })

    const { contest } = useContest();

    const { mutateAsync: newDiscipline } = useMutation({
        mutationFn: async (data: disciplineDTO) => {
            await createDiscipline({ ...data, contestId: contest.id });
        },
        onSuccess: (_, variables: disciplineDTO) => {
            queryClient.setQueryData(['disciplines'], (disciplines: disciplineDTO[]) => {
                return disciplines ? [...disciplines, variables] : [variables];
            })
            toast.success("Disciplina criada com sucesso!");
            onClose();
        },
        onError: (error) => {
            console.error("Erro ao criar disciplina:", error);
            toast.error("Erro ao criar disciplina!");
        }
    })

    async function onSubmit(data: disciplineDTO) {
        await newDiscipline(data);
    }

    useEffect(() => {
        reset();
    }, [onClose, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-black flex flex-row gap-2 items-center">
                        <BookA size={20} />
                        Adicionar Disciplina
                    </DialogTitle>
                    <DialogDescription>
                        Adicione uma nova disciplina ao seu curso.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Nome da Disciplina"
                                placeholder="Ex: Matemática"
                                required
                                onChange={onChange}
                                value={value}
                                errors={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="color"
                        render={({ field: { onChange, value } }) => (
                            <ColorPicker
                                label="Cor da Disciplina"
                                placeholder={watch("name")}
                                errors={errors.color?.message}
                                onChange={e => onChange(e.hex)}
                                color={Color(value).hex()}
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