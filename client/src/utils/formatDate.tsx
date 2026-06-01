export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return;
    return new Date(dateString);
}