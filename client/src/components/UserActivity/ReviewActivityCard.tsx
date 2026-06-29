import { MessageSquarePlus, Star } from "lucide-react";
import type { RecentActivity } from "../../types/api";
import { formatDate, formatReviewDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import type { Media } from "../../pages/HomepageConnected";
import { fetchMedia } from "../../api/tmdb";

export default function ReviewActivityCard({ created_at, review, media }: RecentActivity) {

    const [mediaInfo, setMediaInfo] = useState<Media | null>(null);

    useEffect(() => {
        if (!media?.tmdb_id || !media.type) return;
        fetchMedia(media?.type, media?.tmdb_id)
            .then(data => setMediaInfo(data));
    }, []);

    return (
        <article className="recent-activity-card review-activity-card">
            <div className="header-activity-card">
                <div className="icon-container">
                    <MessageSquarePlus className="icon" />
                </div>
                <div className="action-container">
                    <p className="title">Review ajouté</p>
                    <p className="date">Il y a {formatReviewDate(created_at)}</p>
                </div>
            </div>
            <div className="media-container">
                <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w500${mediaInfo?.poster_path}`} alt="Affiche du film" />
                <div>
                    <div className="media-title-date">
                        <p>
                            {
                                media?.type === 'tv' ?
                                    mediaInfo?.name : mediaInfo?.title
                            }
                        </p>
                        <p className="date">
                            {
                                media?.type === 'tv' ?
                                    formatDate(mediaInfo?.first_air_date)?.getFullYear() :
                                    formatDate(mediaInfo?.release_date)?.getFullYear()
                            }
                        </p>
                    </div>
                    <div>
                        <p className="content">{review?.content}</p>
                    </div>
                </div>
            </div>
        </article>
    )

}