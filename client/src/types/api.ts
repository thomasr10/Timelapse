import type { Media } from "../pages/HomepageConnected"
import type { User } from "./auth"

export type ApiMedia = {
    tmdb_id: number,
    type: string
}

export type UserMedia = {
    id: number | null,
    is_liked: boolean,
    is_watched: boolean,
    rating: number | null,
    review?: string | null
    watched_at: string
}

export type Watchlist = {
    id: number,
    title: string,
    description: string,
    medias: Media[],
    updated_at: string,
    count_media: number
}

export type Review = {
    id: number,
    content: string,
    created_at: string,
    media: Media,
    user: User,
    user_media: UserMedia
}

export type UserRecords = {
    watchlists: Watchlist[] | null,
    watched_medias: number,
    followers: number,
    favorites: Media[] | null,
    recent_activity: [] | null,
    review_count: number | null
}

export type RecentActivity = {
    type?: string,
    created_at: string,
    user_media?: UserMedia | null,
    user?: User | null,
    watchlist?: Watchlist | null,
    media?: ApiMedia | null,
    review?: Review | null
}