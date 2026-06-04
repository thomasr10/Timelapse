import type { Genre } from "../types/tmdb";

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

// cache genre

let cacheMovieGenre: Genre[] | null = null;

export const fetchMovieGenres = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/genre/movie/list?${import.meta.env.VITE_API_LANGUAGE_PARAM}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching genres - status : ${response.status}`);
        }

        const data = await response.json();
        cacheTVGenres = data.genres;

        return cacheTVGenres;

    } catch (e) {
        console.error(e);
        return [];
    }
}

let cacheTVGenres: Genre[] | null = null;

export const fetchTVGenre = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/genre/tv/list?${import.meta.env.VITE_API_LANGUAGE_PARAM}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching genres - status : ${response.status}`);
        }

        const data = await response.json();
        cacheMovieGenre = data.genres;

        return cacheMovieGenre;

    } catch (e) {
        console.error(e);
        return [];
    }
}

export const fetchMedia = async (type: string, id: number) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}?${import.meta.env.VITE_API_LANGUAGE_PARAM}&${import.meta.env.VITE_API_REGION_PARAM}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching media data - status : ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (e) {
        console.error(e);
        return {};
    }
}

export const fetchMediaCredits = async (type: string, id: number) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/${type}/${id}/credits?${import.meta.env.VITE_API_LANGUAGE_PARAM}&${import.meta.env.VITE_API_REGION_PARAM}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching media data - status : ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (e) {
        console.error(e);
        return {};
    }
}

export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}trending/movie/week?${import.meta.env.VITE_API_LANGUAGE_PARAM}`, {
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

export const fetchTrendingSeries = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}trending/tv/week?${import.meta.env.VITE_API_LANGUAGE_PARAM}`, {
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

export const fetchAiringSeries = async (page: number) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}discover/tv?${import.meta.env.VITE_API_LANGUAGE_PARAM}&sort_by=popularity.desc&with_status=0&page=${page}`, {
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