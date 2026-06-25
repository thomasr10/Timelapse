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

export const formatReviewDate = (dateString: string | undefined) => {
    if(!dateString) return;

    const reviewDate = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = (now / 1000) - (reviewDate / 1000);

    let year = Math.floor(diff / 86400 / 365.25)
    let month = Math.floor(diff / 86400 / 30.44);
    let d = Math.floor(diff / 60 / 60 / 24);
    let h = Math.floor(diff / 3600);
    let m = Math.floor(diff % 3600 / 60);
    let s = Math.floor(diff % 3600 % 60);

    if (year > 0) return `${year} a`
    if (month > 0) return `${month} mois`
    if (d > 0) return `${d} j`;
    if (h > 0) return `${h} h`;
    if (m > 0) return `${m} m`;
    return `${s}s`;

}