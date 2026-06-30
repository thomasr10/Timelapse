import { useParams } from "react-router-dom";
import type { Media } from "./HomepageConnected";
import { useEffect, useState } from "react";
import { fetchWatchlistMedia } from "../api/api";
import type { ApiMedia } from "../types/api";
import { fetchMedia } from "../api/tmdb";
import MediaCard from "../components/MediaCard";

export default function WatchlistPage() {

    const { id } = useParams();

    const [mediasId, setMediasId] = useState<ApiMedia[] | []>([]);
    const [mediaArray, setMediaArray] = useState<Media[]>([]);

    useEffect(() => {
        fetchWatchlistMedia(Number(id))
            .then(data => setMediasId(data.results));
    }, []);

    useEffect(() => {

        const loadMediaInfos = async () => {
            const promises = mediasId.map((m: ApiMedia) => (
                fetchMedia(m.type, m.tmdb_id)
            ));

            const results = await Promise.all(promises);
            const grouped: Media[] = results.map(r => r);

            setMediaArray(grouped);
        }

        loadMediaInfos();

    }, [mediasId])

    useEffect(() => {
        console.log(mediaArray);
    }, [mediaArray])


    return (
        <main>
            <section id="watchlist-page" className="section-container">
                <h1>{ }</h1>
                <div className="media-container">
                    {
                        mediaArray.map((m: Media, index: number) => (
                            <MediaCard
                                key={index}
                                id={m.id}
                                title={m.title ? m.title : m.name}
                                media_type={m.title ? 'movie' : 'tv'}
                                poster_path={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w300${m.poster_path}`}
                            />
                        ))
                    }
                </div>
            </section>
        </main>
    )
}