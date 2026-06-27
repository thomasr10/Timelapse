import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {

    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    
    return children;
}