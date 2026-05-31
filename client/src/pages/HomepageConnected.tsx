import { useEffect, useState } from "react"
import { fetchUpcomingMovies } from "../api/tmdb";

interface Movie {
    id: number,
    title: string,
    image_url: string
}

export default function HomepageConnected() {

    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetchUpcomingMovies()
            .then((data) => {
                console.log(data);
                setUpcomingMovies(data.results);
            })
    }, []);

    return (
        <main className="section-container home-connected">
            <h2>Films</h2>
            <section className="movie-slider">
            </section>
            <h3>Les prochaines sorties</h3>
        </main>
    )
}