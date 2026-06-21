import type { Media } from "../pages/HomepageConnected"

export type UserMedia = {
    id: number,
    is_liked: boolean,
    is_watched: boolean,
    rating: number | null,
    watched_at: string
}

export type Watchlist = {
    id: number,
    title: string,
    description: string,
    medias: Media[]
}