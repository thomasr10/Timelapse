import type React from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
    connected: React.ReactNode,
    disconnected: React.ReactNode
}

export default function AuthSwitch({ connected, disconnected }: Props) {

    const { user, isLoading } = useAuth();

    if(isLoading) return null;

    return user ? <>{connected}</> : <>{disconnected}</>

} 