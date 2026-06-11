import { useEffect, useState } from "react"
import { fetchAiringSeries, fetchMovieGenres, fetchTrendingMovies, fetchTrendingSeries, fetchTVGenre, fetchUpcomingMovies } from "../api/tmdb";
import type { Genre } from "../types/tmdb";
import SliderMedia from "../components/SliderMedia"
import UseViewportWidth from "../hooks/useviewportWidth";
import SearchBar from "../components/SearchBar";
import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";
import { startsWith } from "zod";

export interface Media {
    id: number,
    title?: string | undefined,
    name?: string | undefined,
    poster_path: string,
    genre_ids: number[],
    genres: Genre[],
    media_type: string,
    release_date?: string,
    first_air_date?: string,
    profile_path?: string,
    popularity: number
}

export default function HomepageConnected() {

    const [upcomingMovies, setUpcomingMovies] = useState<Media[]>([]);
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTVGenres] = useState<Genre[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
    const [trendingSeries, setTrendingSeries] = useState<Media[]>([]);
    const [airingSeries, setAiringSeries] = useState<Media[]>([]);
    const { startFetch, endFetch, loadingCount } = useLoader();

    const viewportWidth = UseViewportWidth();

    // FETCH GENRES
    useEffect(() => {
        startFetch();
        fetchMovieGenres()
            .then(data => {
                if (data === null) return;
                setMovieGenres(data);
            })
            .finally(() => endFetch());
    }, []);

    useEffect(() => {
        startFetch();
        fetchTVGenre()
            .then(data => {
                if (data === null) return;
                setTVGenres(data);
            })
            .finally(() => endFetch());
    }, [])

    // FETCH MOVIES
    useEffect(() => {
        startFetch();
        fetchTrendingMovies()
            .then((data) => {
                setTrendingMovies(data.results);
            })
            .finally(() => endFetch());
    }, []);

    useEffect(() => {
        startFetch();
        fetchUpcomingMovies()
            .then((data) => {
                console.log(data.results)
                data.results.forEach((movie: Media) => {
                    movie.media_type = 'movie';
                })
                // filtre pour ne pas avoir un meme film dans les 2 sliders + enlever les film
                // qui vont ressortir
                const trendingIds = trendingMovies.map(t => t.id);
                setUpcomingMovies(data.results.filter((m: Media) => !trendingIds.includes(m.id) && m.release_date?.startsWith(new Date().getFullYear().toString())));
            })
            .finally(() => endFetch());
    }, [trendingMovies]);

    useEffect(() => {
        startFetch();
        fetchTrendingSeries()
            .then(data => {
                setTrendingSeries(data.results);
            })
            .finally(() => endFetch());
    }, []);

    useEffect(() => {
        startFetch();
        fetchAiringSeries(1)
            .then(data => {
                data.results.forEach((serie: Media) => {
                    serie.media_type = 'tv';
                });

                const trendingIds = trendingSeries.map(m => m.id);
                setAiringSeries(data.results.filter((m: Media) => !trendingIds.includes(m.id)));
            })
            .finally(() => endFetch());
    }, [trendingSeries])

    return (
        loadingCount > 0 ? <Loader /> :
            <main className="section-container home-connected">
                {
                    viewportWidth < 1200 && (
                        <SearchBar className="search-mobile-container" />
                    )
                }
                <section className="movie-section">
                    <div className="section-title">
                        <h2>Films</h2>
                    </div>
                    <section className="upcoming-movies media-slider-section mt-24">
                        <h3>Les prochaines sorties</h3>
                        <SliderMedia media={upcomingMovies} genres={movieGenres} />
                    </section>
                    <section className="trending-movies media-slider-section mt-24">
                        <h3>Les tendances</h3>
                        <SliderMedia media={trendingMovies} genres={movieGenres} />
                    </section>
                </section>
                <section className="serie-section">
                    <div className="section-title mt-32">
                        <h2>Séries</h2>
                    </div>
                    <section className="media-slider-section mt-24">
                        <h3>En diffusion</h3>
                        <SliderMedia media={airingSeries} genres={tvGenres} />
                    </section>
                    <section className="media-slider-section mt-24">
                        <h3>Les tendances</h3>
                        <SliderMedia media={trendingSeries} genres={tvGenres} />
                    </section>
                </section>
            </main>
    )
}