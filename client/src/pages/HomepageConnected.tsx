import { useEffect, useState } from "react"
import { fetchAiringSeries, fetchMovieGenres, fetchTrendingMovies, fetchTrendingSeries, fetchTVGenre, fetchUpcomingMovies } from "../api/tmdb";
import type { Genre } from "../types/tmdb";
import SliderMedia from "../components/SliderMedia"

export interface Media {
    id: number,
    title?: string | undefined,
    name?: string | undefined,
    poster_path: string,
    genre_ids: number[],
    genres: Genre[],
    media_type: string
}

export default function HomepageConnected() {

    const [upcomingMovies, setUpcomingMovies] = useState<Media[]>([]);
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTVGenres] = useState<Genre[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
    const [trendingSeries, setTrendingSeries] = useState<Media[]>([]);
    const [airingSeries, setAiringSeries] = useState<Media[]>([]);

    // FETCH GENRES
    useEffect(() => {
        fetchMovieGenres()
            .then(data => {
                if (data === null) return;
                setMovieGenres(data);
            });
    }, []);

    useEffect(() => {
        fetchTVGenre()
            .then(data => {
                if (data === null) return;
                setTVGenres(data);
            })
    }, [])

    // FETCH MOVIES
    useEffect(() => {
        fetchTrendingMovies()
            .then((data) => {
                setTrendingMovies(data.results);
            })
    }, []);

    useEffect(() => {
        fetchUpcomingMovies()
            .then((data) => {
                data.results.forEach((movie: Media) => {
                    movie.media_type = 'movie';
                })
                const trendingIds = trendingMovies.map(t => t.id);
                setUpcomingMovies(data.results.filter((m: Media) => !trendingIds.includes(m.id)));
            })
    }, [trendingMovies]);

    useEffect(() => {
        fetchTrendingSeries()
            .then(data => {
                setTrendingSeries(data.results);
            })
    }, []);

    useEffect(() => {
        fetchAiringSeries(1)
            .then(data => {
                console.log(data.results);
                data.results.forEach((serie: Media) => {
                    serie.media_type = 'tv';
                });

                const trendingIds = trendingSeries.map(m => m.id);
                setAiringSeries(data.results.filter((m: Media) => !trendingIds.includes(m.id)));
            })
    }, [trendingSeries])

    return (
        <main className="section-container home-connected">
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