export const formatTmdbRate = (rate: number | null | undefined): string | number => {
    if (rate === null || rate === undefined || rate === 0) return 'N/A';
    return new Intl.NumberFormat("en-EN", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(rate / 2);
}

export const getStarType = (index: number, value: number | null | undefined): string => {
        if (!value) return 'empty';
        if (value >= index) return 'full';
        if (value >= index - 0.5) return 'half';
        return 'empty';
    }