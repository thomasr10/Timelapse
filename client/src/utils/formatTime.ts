export const formatTime = (minutes: number | undefined) => {
    if(!minutes) return 'N/A';

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if(m === 0) return `${h}h`;

    return m > 0 ? `${h}h ${m.toString().padStart(2, "0")}min` : `${h}h`;
}