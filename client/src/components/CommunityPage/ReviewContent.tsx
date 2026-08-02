import { useEffect, useState } from "react";
import type { ApiMedia, Review } from "../../types/api";
import type { Media } from "../../pages/HomepageConnected";
import { fetchMedia } from "../../api/tmdb";

type Props = {
    review: Review | null | undefined,
    media: ApiMedia | null | undefined
}

export default function ReviewContent({ review, media }: Props) {

    const [mediaInfos, setMediaInfos] = useState<Media | null>(null);

    useEffect(() => {
        if (!media) return;
        fetchMedia(media?.type, media?.tmdb_id)
            .then(data => {
                setMediaInfos(data);
            });
    }, []);


    return (
        <div className="content media-content">
            <img
                src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w200${mediaInfos?.poster_path}`}
                alt="Affiche du film"
                loading="lazy"
            />
            <div className="info">
                <p className="title">{mediaInfos?.title ? mediaInfos.title : mediaInfos?.name}</p>
                <p className="action">{review && review.content}</p>
            </div>
        </div>
    )
}