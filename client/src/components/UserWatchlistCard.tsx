// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteWatchlist } from "../api/api";
import { formatReviewDate } from "../utils/formatDate";
import { Trash2 } from "lucide-react";

interface Props {
    title: string,
    poster_paths: string[] | [],
    updated_at: string,
    items: number,
    id: number,
    currentUserId: number | undefined,
    userProfileId: number | undefined
}

export default function UserWatchlistCard({ title, poster_paths, updated_at, items, id, currentUserId, userProfileId }: Props) {

    const handleDeleteWatchlist = (id: number) => {
        deleteWatchlist(id)
        window.location.reload();
    }

    return (
        <article className="user-watchlist-card">
            <div className="posters-container">
                {
                    poster_paths.map((img: string) => (
                        <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w300/${img}`} alt="Affiche de film" loading="lazy"/>
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
            <div className="action-container">
                <Link to={`/watchlist/${id}`} className="watchlist-link">Voir</Link>
                {
                    userProfileId === currentUserId ?
                        <button onClick={() => handleDeleteWatchlist(id)}>
                            <Trash2 className="icon" />
                        </button> : ''
                }
            </div>
        </article>
    )
}