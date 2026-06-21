import type { Media } from "../pages/HomepageConnected"
import type { User } from "./auth"

export type UserMedia = {
    id: number | null,
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

export type Review = {
    id: number,
    content: string,
    created_at: string,
    media: Media,
    user: User,
    user_media: UserMedia
} 