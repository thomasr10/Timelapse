import { createContext, useContext, useEffect, useState } from "react";
import { me, logout } from "../api/auth";
import type { User, AuthContextType } from "../types/auth";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from 'react';

const AuthContext = createContext< AuthContextType | null >(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

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

        } catch (e) {
            console.error(e)
        }

    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, user }}>
            { children }
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}