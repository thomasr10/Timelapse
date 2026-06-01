export const formatCurrency = (n: number | undefined) => {
    if(!n) return 'N/A';
    return n.toLocaleString('fr-FR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}