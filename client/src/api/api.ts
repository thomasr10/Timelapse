export const handleLike = async (isLiked: boolean, tmdb: number, type: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_media/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ isLiked, tmdb, type })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while handling like action : ${response.status}`);
            return data.message;
        }

        return;
    } catch (e) {
        console.error(e);
    }
}

export const handleWatch = async (isWatched: boolean, tmdb: number, type: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_media/watch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ isWatched, tmdb, type })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while handling watch action : ${response.status}`);
            return data.message;
        }

        return;
    } catch (e) {
        console.error(e);
    }
}

export const fetchUserMediaData = async (tmdb: number, type: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_media/${type}/${tmdb}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while fetching User_Media : ${response.status}`);
            return data.message;
        }
        return data;
    } catch (e) {
        console.error(e);
        return;
    }
}

// Récupérer watchlist
export const fetchUserWatchlists = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();
        if (!response.ok) {
            console.error(`Error while fetching user's watchlists : ${response.status}`);
            return data.message;
        }

        return data;
    } catch (e) {
        console.error(e);
    }
}

export const addMovieToWatchlist = async (watchlist_id: number, tmdb: number, type: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/media/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ watchlist_id, tmdb, type }),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while adding media to the watchlist : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}

export const fetchReviews = async (type: string, tmdb: number, offset: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/review/${type}/${tmdb}/${offset}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(`Error while fetching media reviews : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}

export const registerReview = async (content: string, tmdb: number, type: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/review/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, tmdb, type }),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while posting review : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}

export const rateMedia = async (tmdb: number, type: string, rate: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user_media/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tmdb, type, rate }),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while rating media : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}

export const getUserRecords = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/records`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while fetching user records : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}

export const fetchWatchlistMedia = async (id: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/watchlist/${id}/media`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error while fetching user records : ${response.status}`);
            return data;
        }

        return data;

    } catch (e) {
        console.error(e);
    }
}