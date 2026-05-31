export const fetchUpcomingMovies = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/movie/upcoming?${import.meta.env.VITE_API_REGION_PARAM}&${import.meta.env.VITE_API_LANGUAGE_PARAM}&sort_by=popularity.desc&page=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching data from API - status : ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (e) {
        console.error(e);
    }
}