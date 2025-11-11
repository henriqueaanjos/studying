'use client'

import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { api } from "../lib/api";
import { jwtDecode } from 'jwt-decode';
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type JwtPayload = {
    sub: User
};

interface User {
    id: string,
    name?: string;
    email?: string;
}

interface AuthContextProps {
    user: User;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (user: { name: string; email: string; password?: string }) => Promise<void>;
    signOut: () => void;
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const router = useRouter();

    async function signIn(email: string, password: string) {
        try {
            const result = await api.post('/auth/sign-in', {
                email,
                password
            });

            if (result.status === 200) {
                const { access_token } = result.data;
                const payload = jwtDecode<JwtPayload>(access_token);
                setUser(payload.sub);
                api.defaults.headers.common.authorization = `Bearer ${access_token}`
                Cookie.set('authToken', access_token, { expires: 1 });
            }
        } catch {
            throw new Error('Usuário ou senha inválidos!');
        }
    }

    async function signUp(user: { name: string; email: string; password?: string }) {
        try {
            await api.post('/users', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            await signIn(user.email, user.password!);
        } catch {
            throw new Error('Erro ao cadastrar usuário!');
        }
    }

    function signOut() {
        Cookie.remove('authToken');
        api.defaults.headers.common.authorization = null;
        setUser({} as User);
        router.push('/');
    }

    useEffect(() => {
        const token = Cookie.get('authToken');
        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;
            const payload = jwtDecode<JwtPayload>(token);
            setUser(payload.sub);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}