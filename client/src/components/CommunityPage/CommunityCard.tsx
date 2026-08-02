import type { RecentActivity } from "../../types/api";
import { formatReviewDate } from "../../utils/formatDate";
import { formatUsername } from "../../utils/formatText";
import ReviewContent from "./ReviewContent";
import WatchlistContent from "./WatchlistContent";
import LikeContent from "./LikeContent";
import RateContent from "./RateContent";
import FollowContent from "./FollowContent";

export default function CommunityCard({
    user_followed,
    user,
    created_at,
    user_media,
    media,
    review,
    type,
    watchlist
}: RecentActivity) {

    return (
        <article className="community-card">
            <div className="activity-info">
                {
                    (user !== undefined && user !== null) && (
                        <>
                            <div className="user-info">
                                <img src={user?.profile_picture ?
                                    `${import.meta.env.VITE_IMAGE_BASE_URL}/${user.profile_picture}` :
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=111726&color=A9B4C6`
                                } alt="Photo de profil de l'utilisateur"
                                />
                                <p className="username">{formatUsername(user?.username)}</p>
                            </div>
                            <p className="date">{formatReviewDate(created_at)}</p>
                        </>
                    )
                }
            </div>
            <div>
                {
                    type === 'watchlist' ?
                        <WatchlistContent watchlist={watchlist} media={media} /> :
                    type === 'review' ?
                        <ReviewContent review={review} media={media}/> : 
                    type === 'like' ?
                        <LikeContent media={media} /> :
                    type === 'rate' ?
                        <RateContent media={media} user_media={user_media} /> : 
                    type === 'follow' ?
                        <FollowContent user_followed={user_followed}/> :
                    ''

                }
            </div>
        </article>
    )
}