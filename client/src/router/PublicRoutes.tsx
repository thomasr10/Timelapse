import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PublicRoutes({ children }: { children: ReactNode }) {

    const { isAuth, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) return null;
    isAuth && navigate('/');
    return children;
}