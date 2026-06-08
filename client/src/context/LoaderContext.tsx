import React, { createContext, useCallback, useContext, useState } from "react";
import type { LoaderContext } from "../types/loader";

const LoaderContext = createContext<LoaderContext | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode}) {
    const [loadingCount, setLoadingCount] = useState(0);
    
    const startFetch = useCallback(() => setLoadingCount((prev: number) => prev+1), []);
    const endFetch = useCallback(() => setLoadingCount((prev: number) => prev-1), []);

    return <LoaderContext.Provider value={{ loadingCount, startFetch, endFetch}}>
        { children }
    </LoaderContext.Provider>
}

export function useLoader(): LoaderContext {
    const context = useContext(LoaderContext);
    if (!context) throw new Error('useLoader must be used within LoaderProvider');
    return context;
}