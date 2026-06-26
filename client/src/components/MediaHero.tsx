import React, { useEffect, useState } from "react"
import type { Genre } from "../types/tmdb"
import { formatDate } from "../utils/formatDate"
import { formatTime } from "../utils/formatTime"
import { Dot, Star, CirclePlus, Eye, Heart, EyeOff, StarHalf } from 'lucide-react'
import { addMovieToWatchlist, handleLike, handleWatch, rateMedia } from "../api/api"
import type { UserMedia, Watchlist } from "../types/api"
import AddWatchlistModal from "./AddWatchlistModal"

interface Props {
    id?: number
    poster_path: string | undefined,
    title?: string | undefined,
    genres: Genre[] | undefined,
    release_date?: string | undefined,
    runtime?: number | undefined,
    number_of_seasons?: number | undefined,
    overview: string | undefined,
    type: string | undefined,
    userMedia: UserMedia | null,
    userWatchlists: Watchlist[] | null
}

export default function MediaHero({ id, poster_path, title, genres, release_date, runtime, overview, number_of_seasons, type, userMedia, userWatchlists }: Props) {

    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // rating
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [rating, setRating] = useState<number | null>(null);

    const handleRatingHover = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        setHoverValue(x < width / 2 ? index - 0.5 : index);
    }

    const getStarType = (index: number, value: number | null): string => {
        if (!value) return 'empty';
        if (value >= index) return 'full';
        if (value >= index - 0.5) return 'half';
        return 'empty';
    }
    
    const rate = async (rate: number | null) => {
        if (!type || !id || rate === null) return;
        setRating(hoverValue);
        setIsWatched(true);
        rateMedia(Number(id), type, rate);        
    } 

    // Watchlists modal
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);

    useEffect(() => {
        if (!userMedia) return;
        setIsLiked(userMedia.is_liked);
        setIsWatched(userMedia.is_watched);
        setRating(userMedia?.rating);
    }, [])


    const handleLikeBtn = async () => {
        if (!id || !type) return;

        const newLikedValue = !isLiked;
        const previousLikedValue = isLiked;
        setIsLiked(newLikedValue);

        if (newLikedValue) {
            setIsWatched(newLikedValue);
        }
        try {
            await handleLike(newLikedValue, id, type);
        } catch {
            setIsLiked(previousLikedValue);
        }
    }

    const handleWatchBtn = async () => {
        if (!id || !type) return;

        const newWatchdValue = !isWatched;
        const previousWatchedValue = isWatched;
        setIsWatched(newWatchdValue);

        try {
            await handleWatch(newWatchdValue, id, type);
        } catch {
            setIsWatched(previousWatchedValue);
        }
    }

    const handleAddMovie = () => {
        if (!selectedId || !id || !type) return;
        addMovieToWatchlist(selectedId, id, type)
            .then((data) => {
                onAddModalClose();
                alert(data.message);
            });
    }

    const onAddModalClose = () => {
        setAddModalIsOpen(false);
        setSelectedId(null);
    }

    return (
        <>
            {
                addModalIsOpen && (
                    <AddWatchlistModal watchlists={userWatchlists} onSelect={setSelectedId} selectedId={selectedId} onClose={() => onAddModalClose()} onValidate={() => handleAddMovie()} />
                )
            }
            < section className="media-hero">
                <figure>
                    <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w500${poster_path}`} alt={`Affiche du film ${title}`} />
                </figure>
                <div className="infos-container">
                    <div className="main-info">
                        <p className="title">{title}</p>
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
                        <p className="sub-info">{type === "movie" ? formatTime(runtime) : (number_of_seasons && number_of_seasons <= 1) ? `${number_of_seasons} saison` : `${number_of_seasons} saisons`}</p>
                    </div>
                    <div className="hero-btn-container">
                        <button
                            className="main-btn red-btn full-btn-resizable"
                            type="button"
                            onClick={() => setAddModalIsOpen(!addModalIsOpen)}
                        >
                            Ajouter à une Watchlist<CirclePlus className="icon" />
                        </button>
                    </div>
                    <div className="interact-container">
                        <div className="btn-wrapper">
                            <div className="is-viewed-btn" onClick={() => handleWatchBtn()}>
                                {
                                    isWatched ?
                                        <Eye className="icon" /> : <EyeOff className="icon" />
                                }
                            </div>
                            <div className="is-liked-btn" onClick={() => handleLikeBtn()}>
                                <Heart
                                    className="icon"
                                    fill={
                                        isLiked ? "#D7263D" : "transparent"
                                    }
                                />
                            </div>
                        </div>
                        <div className="rate">
                            {
                                [1, 2, 3, 4, 5].map(index => (
                                    <div
                                        key={index}
                                        className="icon"
                                        onMouseMove={(e) => handleRatingHover(e, index)}
                                        onMouseLeave={() => setHoverValue(null)}
                                        onClick={() => rate(hoverValue)}
                                    >
                                        {getStarType(index, hoverValue ?? rating) === 'full' && <Star fill="#FFC107" />}
                                        {getStarType(index, hoverValue ?? rating) === 'half' && <StarHalf fill="#FFC107" />}
                                        {getStarType(index, hoverValue ?? rating) === 'empty' && <Star />}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}