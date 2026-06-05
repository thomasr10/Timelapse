import type { Genre } from "../types/tmdb"
import { formatDate } from "../utils/formatDate"
import { formatTime } from "../utils/formatTime"
import Button from "./Button"
import { Dot, Star, CirclePlus, Eye, Heart } from 'lucide-react'

interface Props {
    poster_path: string | undefined,
    title?: string | undefined,
    name?: string | undefined,
    genres: Genre[] | undefined,
    release_date?: string | undefined,
    runtime?: number | undefined,
    number_of_seasons?: number | undefined,
    overview: string | undefined
}

export default function MediaHero({ poster_path, title, genres, release_date, runtime, overview, name,number_of_seasons }: Props) {

    return (
        <section className="media-hero">
            <figure>
                <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w500${poster_path}`} alt={`Affiche du film ${title}`} />
            </figure>
            <div className="infos-container">
                <div className="main-info">
                    <p className="title">
                        {
                            title ? title : name
                        }
                    </p>
                    <p className="description">{overview}</p>
                </div>
                <div className="sub-infos-container">
                    <div className="rate-container">
                        <Star className="rating-star" />
                        <p>5</p>
                    </div>
                    <Dot className="dot-separator" />
                    <p className="sub-info">{genres?.slice(0, 3).map(g => g.name).join(' / ')}</p>
                    <Dot className="dot-separator" />
                    <p className="sub-info">{formatDate(release_date)?.getFullYear()}</p>
                    <Dot className="dot-separator" />
                    <p className="sub-info">{runtime ? formatTime(runtime) : (number_of_seasons && number_of_seasons<= 1) ? `${number_of_seasons} saison` : `${number_of_seasons} saisons` }</p>
                </div>
                <div className="hero-btn-container">
                    <Button className="main-btn red-btn full-btn-resizable" type="button" disabled={false}>
                        Ajouter à une Watchlist<CirclePlus className="icon" />
                    </Button>
                </div>
                <div className="interact-container">
                    <div className="btn-wrapper">
                        <div className="is-viewed-btn">
                            <Eye className="icon" />
                        </div>
                        <div className="is-liked-btn">
                            <Heart className="icon" />
                        </div>
                    </div>
                    <div className="rate">
                        <Star className="icon" /><Star className="icon" /><Star className="icon" /><Star className="icon" /><Star className="icon" />
                    </div>
                </div>
            </div>
        </section>
    )
}