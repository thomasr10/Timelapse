export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return;
    return new Date(dateString);
}

export const localFormatDate = (dateString: string | undefined) => {
    if (!dateString) return;
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}