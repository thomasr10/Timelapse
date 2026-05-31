import { createContext, useContext, useEffect, useState } from "react";
import { me, logout } from "../api/auth";
import type { User, AuthContextType } from "../types/auth";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from 'react';

const AuthContext = createContext< AuthContextType | null >(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const refreshUser = async() => {
        try {
            const data = await me();
            setUser(data);
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        try {
            me()
                .then((data) => {
                    if(data === null) {
                        setUser(null);
                        setIsAuth(false);
                        logout();
                        navigate('/');
                        return;
                    }
                    setUser(data);
                    setIsAuth(true);
                })
                .catch((e) => console.error(e))
                .finally(() => setIsLoading(false))

        } catch (e) {
            console.error(e)
        }

    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, user, isLoading, refreshUser }}>
            { children }
        </AuthContext.Provider>
    )

}

export function useAuth(): AuthContextType {

    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be used within AuthProvider');

    return context;
}