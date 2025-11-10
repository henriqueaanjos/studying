'use client'

import { Input } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface SignInFormData {
    email: string;
    password: string;
}

const signInSchema = yup.object({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
})

export default function SignIn() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema),
    });

    const { signIn } = useAuth();

    const { mutateAsync: signInFn, isError} = useMutation({
        mutationKey: ['signIn'],
        mutationFn: async (data: SignInFormData) => {
            await signIn(data.email, data.password);
        },
        onSuccess: () => {
            redirect('/Home');
        },
        onError: (error) => {
            console.error("Erro ao fazer login:", error);
        }
    })

    async function onSubmit(data: SignInFormData) {
        await signInFn(data);
    }

    return (
        <div className="w-screen h-screen flex flex-row flex-wrap-reverse lg:grid lg:grid-cols-2 bg-primary">
            <div className="flex w-full items-center justify-center">
                <section className="min-w-xl bg-white p-8 rounded-2xl shadow-2xl flex  flex-col items-center">
                    <h1 className="text-4xl font-bold text-primary">
                        Faça Login agora!
                    </h1>
                    <h3 className="text-secondary font-light">É necessário estar autenticado acessar a plataforma!</h3>
                    <form className="w-full mt-10 flex flex-col gap-4">
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
                        <div className="flex flex-col items-center justify-center">
                            {isError && (
                                <p className="text-red-500 text-sm font-medium text-center">
                                    Erro ao fazer login. Verifique suas credenciais!
                                </p>
                            )}
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="mt-6 cursor-pointer w-full rounded-lg bg-primary text-white shadow-2xl hover:shadow-md hover:brightness-90 hover:scale-95 p-2 font-black uppercase text-sm transition-all duration-300"
                            >
                                Fazer Login
                            </button>
                            <Link
                                href="/SignUp"
                                className="mt-2 text-primary text-sm font-light text-center hover:text-secondary transition-colors duration-200"
                            >
                                Ainda não tem Login, cadastre-se agora mesmo!
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
