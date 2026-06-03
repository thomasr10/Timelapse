import { useEffect, useState } from "react"
import { fetchGenres, fetchTrendingMovies, fetchUpcomingMovies } from "../api/tmdb";
import type { Genre } from "../types/tmdb";
import SliderMedia from "../components/SliderMedia"

export interface Media {
    id: number,
    title?: string | undefined,
    name?: string | undefined,
    poster_path: string,
    genre_ids: number[],
    genres: Genre[]
}

export default function HomepageConnected() {

    const [upcomingMovies, setUpcomingMovies] = useState<Media[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);

    // FETCH GENRES
    useEffect(() => {
        fetchGenres()
            .then((data) => {
                if (data === null) return;
                setGenres(data);
            });
    }, []);

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
                const trendingIds = trendingMovies.map(t => t.id);
                setUpcomingMovies(data.results.filter((m: Media) => !trendingIds.includes(m.id)));
            })
    }, [trendingMovies]);


    return (
        <main className="section-container home-connected">
            <section className="movie-section">
                <div className="section-title">
                    <h2>Films</h2>
                </div>
                <section className="upcoming-movies media-slider-section mt-32">
                    <h3>Les prochaines sorties</h3>
                    <SliderMedia media={upcomingMovies} genres={genres} />
                </section>
                <section className="trending-movies media-slider-section mt-24">
                    <h3>Les tendances</h3>
                    <SliderMedia media={trendingMovies} genres={genres} />
                </section>
            </section>
        </main>
    )
}