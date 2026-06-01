import { useEffect, useState } from "react"
import { fetchGenres, fetchUpcomingMovies } from "../api/tmdb";
import MediaCard from "../components/MediaCard";
import type { Genre } from "../types/tmdb";

export interface Media {
    id: number,
    title: string,
    poster_path: string
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
                console.log(data)
                setGenres(data);
            });
    }, []);

    useEffect(() => {
        fetchUpcomingMovies()
            .then((data) => {
                console.log(data);
                setUpcomingMovies(data.results);
            })
    }, []);

    return (
        <main className="section-container home-connected">
            <div className="section-title">
                <h2>Films</h2>
            </div>
            <section className="media-slider-section">
                <h3>Les prochaines sorties</h3>
                <div className="media-card-slider">
                    {
                        upcomingMovies && (
                            upcomingMovies.map((m) => (
                                <MediaCard key={m.id} id={m.id} title={m.title} poster_path={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/w500${m.poster_path}`} genre_ids={m.genre_ids} genres={genres} type="movie"/>
                            ))
                        )
                    }
                </div>
            </section>
        </main>
    )
}