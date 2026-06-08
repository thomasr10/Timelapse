import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {

    const { isAuth, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) return null;
    !isAuth && navigate('/login');
    return children;
}