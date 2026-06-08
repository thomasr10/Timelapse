export const handleLike = async (isLiked: boolean, tmdb: number, type: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/like`, {
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