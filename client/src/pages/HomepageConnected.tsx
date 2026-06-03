import { useEffect, useState } from "react"
import { fetchGenres, fetchUpcomingMovies } from "../api/tmdb";
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

    useEffect(() => {
        fetchGenres()
            .then((data) => {
                if (data === null) return;
                setGenres(data);
            });
    }, []);

    useEffect(() => {
        fetchUpcomingMovies()
            .then((data) => {
                console.log(data.results)
                setUpcomingMovies(data.results);
            })
    }, []);

    return (
        <main className="section-container home-connected">
            <div className="section-title">
                <h2>Films</h2>
            </div>
            <section className="upcoming-movies media-slider-section">
                <h3>Les prochaines sorties</h3>
                <SliderMedia media={upcomingMovies} genres={genres} />
            </section>
        </main>
    )
}