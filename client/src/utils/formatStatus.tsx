export const formatStatus = (status: string | undefined): string => {

    if (!status) return 'N/A'

    let responseStatus = "";

    switch (status) {
        case "Returning Series":
            responseStatus = "En cours";
            break;
        case "Ended":
            responseStatus = "Terminée";
            break;
        case "Canceled":
            responseStatus = "Annulée";
            break;
    }

    return responseStatus;
}