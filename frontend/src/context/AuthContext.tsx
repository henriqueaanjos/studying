'use client'

import { createContext, ReactNode, useEffect } from "react";
import Cookie from 'js-cookie';
import { api } from "../lib/api";

interface User {
    id?: string,
    name: string;
    email: string;
    password: string;
}

interface AuthContextProps {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (user: User) => Promise<string>;
    signOut: () => void;
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext= createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    async function signIn(email: string, password: string) {
        const result = await api.post('/auth/sign-in', {
            email,
            password
        });

        if (result.status === 200) {
            const { access_token } = result.data;
            api.defaults.headers.common.authorization = `Bearer ${access_token}`
            Cookie.set('authToken', access_token, { expires: 1 });
        }
        else {
            throw new Error('Usuário ou senha inválidos');
        }
    }

    async function signUp(user: User) {
        const result = await api.post('/users', {
            name: user.name,
            email: user.email,
            password: user.password
        })

        await signIn(user.email, user.password);

        return result.data.id
    }

    function signOut() {
        Cookie.remove('authToken');
        api.defaults.headers.common.authorization = null;
    }

    useEffect(() => {
        const token = Cookie.get('authToken');
        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`;
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}