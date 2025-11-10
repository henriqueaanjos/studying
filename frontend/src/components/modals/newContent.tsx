'use client'
import { FileText, FileVideoCamera, Plus, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select } from "../Select";
import { RadioGroup } from "../RadioGroup";
import { Input } from "../Input";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contentDTO, contentDTOFormat } from "@/dto/content";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllDiscipline } from "@/services/discipline.request";
import { getAllLesson } from "@/services/lesson.request";
import { createContent } from "@/services/content.request";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { useEffect } from "react";


type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

const contentSchema = yup.object({
    discipline: yup.string().required("A disciplina é obrigatória"),
    lessonId: yup.string().required("A aula é obrigatória"),
    contentTypeId: yup.string().oneOf(['video', 'pdf']).required("O tipo de conteúdo é obrigatório"),
    numberContent: yup.number()
        .when("type", {
            is: "video",
            then: (schema) => schema.required("O número do conteúdo é obrigatório").min(0, "O número do conteúdo deve ser maior ou igual a 0"),
            otherwise: (schema) => schema.notRequired(),
        }),
    durationSeconds: yup.string()
        .when("type", {
            is: "video",
            then: (schema) => schema.required("A duração do vídeo é obrigatória"),
            otherwise: (schema) => schema.notRequired(),
        }),
})

export function NewContentModal({ isOpen, onClose }: DialogProps) {
    const { control, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(contentSchema)
    })


    function formatDuration(value: string) {
        const sanitized = value.replace(/[^0-9:]/g, "");
        const parts = sanitized.split(":").map(p => p.slice(0, 2));
        const [h = "", m = "", s = ""] = parts;
        let formatted = h;
        if (m.length > 0 || sanitized.includes(":")) formatted += `:${m}`;
        if (s.length > 0 || sanitized.split(":").length > 2) formatted += `:${s}`;
        if (formatted.match(/^(\d):/)) {
            formatted = formatted.replace(/^(\d):/, "0$1:");
        }
        return formatted.slice(0, 8);
    }

    function durationToSeconds(formatted: string) {
        const parts = formatted.split(":").map(Number);
        const [h, m, s] = parts;
        const result = h * 3600 + m * 60 + s;
        return result;
    }

    const { mutateAsync: newContent } = useMutation({
        mutationFn: async (data: contentDTO) => {
            const formattedData = {
                numberContent: data.contentTypeId === 'video' ? data.numberContent : 0,
                durationSeconds: data.contentTypeId === 'video' ? data.durationSeconds : 7200,
                lessonId: data.lessonId,
                contentTypeId: data.contentTypeId === 'video' ? '29a98167-eb71-4ce6-867d-6a58ec93fd33' : '53cb8e33-f7a4-4128-bb4c-df150cf35ca8',
            }
            await createContent({ ...formattedData });
        },
        onSuccess: (_, variables: contentDTO) => {
            queryClient.setQueryData(['contents'], (contents: contentDTO[]) => {
                return contents ? [...contents, variables] : [variables];
            })
            toast.success("Aula criada com sucesso!");
            onClose();
        },
        onError: (error) => {
            console.error("Erro ao criar aula:", error);
            toast.error("Erro ao criar aula!");
        }
    })

    async function onSubmit(data: contentDTOFormat) {
        await newContent({
            numberContent: data.numberContent,
            durationSeconds: durationToSeconds(data.durationSeconds.toString()),
            lessonId: data.lessonId,
            contentTypeId: data.contentTypeId,
        });
    }

    const { data: disciplines } = useQuery({
        queryKey: ['disciplines'],
        queryFn: getAllDiscipline,
    })

    const { data: lessons } = useQuery({
        queryKey: ['lessons'],
        queryFn: getAllLesson,
    })

    useEffect(() => {
        reset();
    }, [onClose, reset]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-black flex flex-row gap-2 items-center">
                        <FileVideoCamera size={20} />
                        Adicionar Conteúdo
                    </DialogTitle>
                    <DialogDescription>
                        Adicione um novo Conteúdo à uma aula.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4">
                    <Controller
                        control={control}
                        name="discipline"
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
                                errors={errors.discipline?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lessonId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Aula"
                                placelholder="Selecione a Aula"
                                items={lessons && lessons.length > 0 && watch('discipline') ?
                                    lessons.filter(lesson => watch('discipline') ? lesson.discipline.id === watch('discipline') : true).map(lesson =>
                                        ({ label: lesson.numberLesson.toString(), value: lesson.id })
                                    )
                                    : []
                                }
                                onValueChange={onChange}
                                value={value}
                                errors={errors.lessonId?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="contentTypeId"
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup
                                label="Tipo de Conteúdo"
                                direction="horizontal"
                                items={[
                                    { value: 'video', label: 'Vídeo', icon: <Video size={16} /> },
                                    { value: 'pdf', label: 'PDF', icon: <FileText size={16} /> },
                                ]}
                                onValueChange={onChange}
                                value={value}
                                errors={errors.contentTypeId?.message}
                            />
                        )}
                    />
                    {watch("contentTypeId") === 'video' &&
                        <>
                            <Controller
                                control={control}
                                name="numberContent"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Número do Vídeo"
                                        type="number"
                                        min={0}
                                        placeholder="0"
                                        onChange={e => onChange(e.target.value === '' ? 0 : e.target.value)}
                                        value={value}
                                        errors={errors.numberContent?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="durationSeconds"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Duração do Vídeo"
                                        placeholder="00:00:00"
                                        info="No formato hh:mm:ss"
                                        value={value}
                                        onChange={(e) => onChange(formatDuration(e.target.value))}
                                        errors={errors.durationSeconds?.message}
                                    />
                                )}
                            />
                        </>
                    }
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