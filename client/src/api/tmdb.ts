import type { Genre } from "../types/tmdb";

export const fetchUpcomingMovies = async () => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upcoming-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movie/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching genres - status : ${response.status}`);
        }

        const data = await response.json();
        cacheMovieGenre = data.results.genres;

        return cacheMovieGenre;

    } catch (e) {
        console.error(e);
        return [];
    }
}

let cacheTVGenres: Genre[] | null = null;

export const fetchTVGenre = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tv/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching genres - status : ${response.status}`);
        }

        const data = await response.json();
        cacheTVGenres = data.results.genres;

        return cacheTVGenres;

    } catch (e) {
        console.error(e);
        return [];
    }
}

export const fetchMedia = async (type: string, id: number) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/details/${type}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching media data - status : ${response.status}`);
        }

        const data = await response.json();

        return data.results;
    } catch (e) {
        console.error(e);
        return {};
    }
}

export const fetchMediaCredits = async (type: string, id: number) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/credits/${type}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Error while fetching media data - status : ${response.status}`);
        }

        const data = await response.json();

        return data.results;

    } catch (e) {
        console.error(e);
        return {};
    }
}

export const fetchTrendingMovies = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movie/trending`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tv/trending`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const fetchAiringSeries = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tv/airing`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const fetchMovieByTitle = async (value: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/movie/${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const fetchSerieByTitle = async (value: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tv/${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export const fetchCastByName = async (value: string) => {

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cast/${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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