import { Link } from "react-router-dom";
import { formatReviewDate } from "../utils/formatDate";

interface Props {
    title: string,
    poster_paths: string[] | [],
    updated_at: string,
    items: number
}

export default function UserWatchlistCard({ title, poster_paths, updated_at, items }: Props) {

    return (
        <Link to={'/#'}>
            <article className="user-watchlist-card">
                <div className="posters-container">
                    {
                        poster_paths.map((img: string) => (
                            <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w300/${img}`} alt="Affiche de film" />
                        ))
                    }
                </div>
                <div className="watchlist-info">
                    <p className="title">{title}</p>
                    <div className="sub-info">
                        <p className="description">Mise à jour il y a {formatReviewDate(updated_at)}</p>
                        <p className="description">-</p>
                        <p className="description">{items} items</p>
                    </div>
                </div>
            </article>
        </Link>
    )
}