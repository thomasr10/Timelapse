import { useEffect, useState } from "react";
import type { ApiMedia, UserMedia } from "../../types/api";
import type { Media } from "../../pages/HomepageConnected";
import { fetchMedia } from "../../api/tmdb";
import { getStarType } from "../../utils/formatRate";
import { Star, StarHalf } from "lucide-react";

type Props = {
    user_media: UserMedia | undefined | null,
    media: ApiMedia | undefined | null
}

export default function RateContent({ user_media, media }: Props) {

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
                <div>
                    <div className="rate">
                        <div className="flex-row gap-4">
                            {
                                [1, 2, 3, 4, 5].map(index => (
                                    <div
                                        key={index}
                                        className="icon"
                                    >
                                        {getStarType(index, user_media?.rating) === 'full' && <Star fill="#FFC107" />}
                                        {getStarType(index, user_media?.rating) === 'half' && <StarHalf fill="#FFC107" />}
                                        {getStarType(index, user_media?.rating) === 'empty' && <Star />}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}