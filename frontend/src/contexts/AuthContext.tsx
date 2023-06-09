import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import Router from "next/router";

import { api } from "../services/apiClient";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try{
        destroyCookie(undefined, "@nextauth.token");
        Router.push("/");
    }catch{
        console.log("ERRO AO FAZER LOGOUT!");
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {

        // Tentar buscar cookie (token)
        const { "@nextauth.token": token } = parseCookies();

        if(token) {
            api.get("/me")
                .then(response => {
                    const { id, name, email } = response.data;
                    
                    setUser({
                        id,
                        name,
                        email,
                    });
                })
                .catch((err) => {
                    // Deslogar usuário
                    signOut();
                });
        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            });

            const { id, name, token } = response.data;

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
                path: "/" // Todos os caminhos terão acesso ao cookie
            });

            setUser({
                id,
                name,
                email,
            });

            // Passar o token para as próximas requisições
            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            toast.success(`Bem-vindo(a) ao FastBurger ${name}`);

            // Redirecionar o usuário para o DASHBOARD
            Router.push("/dashboard");

        }catch(err) {
            toast.error("Erro ao fazer login!");
            console.log("ERRO AO ACESSAR: ", err);
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {

            const response = await api.post("/users", {
                name,
                email,
                password
            });

            toast.success("Conta criada com sucesso!");

            Router.push("/");

        } catch(err) {
            toast.error("Erro ao criar conta!");
            console.log("ERRO AO CADASTRAR USUÁRIO: ", err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}