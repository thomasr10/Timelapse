export const formatTmdbRate = (rate: number | null | undefined): string | number => {
    if (rate === null || rate === undefined) return 'N/A';
    return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(rate / 2);
}