export type LoaderContext = {
    startFetch: () => void,
    endFetch: () => void,
    loadingCount: number
}