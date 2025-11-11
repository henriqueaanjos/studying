'use client'

import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { UserDTO } from "@/dto/user";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    repeat_password: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),

    password: yup.string().required('Senha obrigatória').min(6, 'Mínimo 6 caracteres'),

    repeat_password: yup.string().required('Confirme a senha')
        .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
});


export default function SignUp() {

    const queryClient = useQueryClient();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const { signUp } = useAuth();

    const { mutateAsync: signUpFn } = useMutation({
        mutationFn: async (data: SignUpFormData) => {
            await signUp(data);
        },
        onSuccess: (data, variables: SignUpFormData) => {
            queryClient.setQueryData(['users'], (users: UserDTO[]) => {
                return [...users, { id: data, name: variables.name, email: variables.email }]
            })
            toast.success("Usuário Adicionado com sucesso!");
            redirect('/List')
        },
        onError: (error) => {
            console.error("Erro ao criar Usuário:", error);
            toast.error("Erro ao criar Usuário. Tente novamente.");
        }
    })

    async function onSubmit(data: SignUpFormData) {
        await signUpFn(data);
    }

    return (
        <div className="w-screen h-screen flex flex-row flex-wrap-reverse lg:grid lg:grid-cols-2 bg-primary">
            <div className="flex w-full items-center justify-center">
                <section className="min-w-xl bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-primary">
                        Cadastre-se agora!
                    </h1>
                    <h3 className="text-secondary font-light">Faça seu cadastro, é rápido e fácil!</h3>
                    <form className="w-full mt-10 flex flex-col gap-4">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Nome"
                                    onChange={onChange}
                                    value={value}
                                    errors={errors.name?.message}
                                    placeholder="Digite seu nome"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Email"
                                    onChange={onChange}
                                    value={value}
                                    errors={errors.email?.message}
                                    placeholder="Digite seu e-mail"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Password"
                                    type="password"
                                    onChange={onChange}
                                    value={value}
                                    errors={errors.password?.message}
                                    placeholder="Digite sua senha"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="repeat_password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    label="Repita sua Password"
                                    type="password"
                                    onChange={onChange}
                                    value={value}
                                    errors={errors.repeat_password?.message}
                                    placeholder="Digite sua senha novamente"
                                />
                            )}
                        />
                        <div className="flex flex-col items-center justify-center">
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="mt-6 cursor-pointer w-full rounded-lg bg-primary text-white shadow-2xl hover:shadow-md hover:brightness-90 hover:scale-95 p-2 font-black text-sm uppercase transition-all duration-300"
                            >
                                Cadastrar
                            </button>
                            <Link
                                href="/SignIn"
                                className="mt-2 text-primary text-sm font-light text-center hover:text-secondary transition-colors duration-200"
                            >
                                Já tem cadastro? Entre agora!
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <Logo size="lg" />
                <h3 className=" text-2xl text-white font-thin">Sua Plataforma de organização de estudos!</h3>
            </div>
        </div>
    )
}
