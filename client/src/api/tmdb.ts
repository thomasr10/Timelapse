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

let cacheGenre: Genre[] | null = null;

export const fetchGenres = async () => {

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
        cacheGenre = data.genres;

        return cacheGenre;

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