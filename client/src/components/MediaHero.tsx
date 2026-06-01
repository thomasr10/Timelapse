import type { Genre } from "../types/tmdb"
import { formatDate } from "../utils/formatDate"
import Button from "./Button"
import { Dot, Star, CirclePlus } from 'lucide-react'

interface Props {
    poster_path: string | undefined,
    title: string | undefined,
    genres: Genre[] | undefined,
    release_date: string | undefined,
    runtime: number | undefined
}

export default function MediaHero({ poster_path, title, genres, release_date, runtime }: Props) {
    console.log(genres)
    return (
        <section className="media-hero">
            <figure>
                <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w500${poster_path}`} alt={`Affiche du film ${title}`} />
            </figure>
            <div className="infos-container">
                <p className="title">{title}</p>
                <div className="sub-infos-container">
                    <div className="rate-container">
                        <Star className="rating-star"/>
                        <p>5</p>
                    </div>
                    <Dot className="dot-separator"/>
                    <p className="sub-info">{ genres?.slice(0,3)?.map((g, index) => (
                        (index === 2) ? `${g.name}` : `${g.name} / `
                    )) }</p>
                    <Dot className="dot-separator"/>
                    <p className="sub-info">{ formatDate(release_date)?.getFullYear() }</p>
                    <Dot className="dot-separator"/>
                    <p className="sub-info">{ runtime }</p>
                </div>
                <Button className="add-watchlist-btn" type="button" disabled={false}>
                    Ajouter à une Watchlist<CirclePlus className="icon"/>
                </Button>
                <div className="interact-container">
                    View
                    Like
                    Stars
                </div>
            </div>
        </section>
    )
}