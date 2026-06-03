import { Link } from "react-router-dom";
import type { Genre } from "../types/tmdb";
interface Props {
    id: number,
    title: string | undefined,
    poster_path: string,
    genre_ids: number[],
    genres: Genre[],
    type: 'movie' | 'tv',
}

export default function MediaCard({ id, title, poster_path, genre_ids, genres, type }: Props) {

    const movieGenres = Array.isArray(genres) && genres.length > 0
        ? genre_ids.map((id) => genres.find(g => g.id === id)?.name).filter(Boolean)
        : [];

    return (
        <Link to={`/media/${type}/${id}`}>
            <div className="media-card" id={id.toString()}>
                <img src={poster_path} alt={`Affiche du film ${title}`} />
                <div className="info-container">
                    <p className="title">{title}</p>
                    <p className="genre">{movieGenres.join(", ")}</p>
                </div>
            </div>
        </Link>
    )
}