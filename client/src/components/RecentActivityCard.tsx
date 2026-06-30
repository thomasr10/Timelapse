import { Heart, ListPlus, MessageSquare, Star } from "lucide-react";
import type { RecentActivity } from "../types/api";
import { formatReviewDate } from "../utils/formatDate";

export default function RecentActivityCard({ type, created_at, user_media }: RecentActivity) {

    return (
        <article className="recent-activity-card">
            <div>
                {
                    type === 'rate' ? <Star className="star" /> :
                        type === 'review' ? <MessageSquare className="review" /> :
                            type === 'watchlist' ? <ListPlus className="watchlist" /> :
                                type === 'like' ? <Heart /> : ''
                }
                <div>
                    <p>
                        {
                            type === 'rate' ? 'Note' :
                                type === 'review' ? 'Review' :
                                    type === 'watchlist' ? 'Ajout à une watchlist' :
                                        type === 'like' ? 'Vous avez liké' : ''
                        }
                    </p>
                    <p>{formatReviewDate(created_at)}</p>
                </div>
            </div>
            <div>
                {
                    type === 'rate' ? user_media?.rating :
                        type === 'watchlist' ?
                            <div>
                                <img src={''} alt="Affiche de film" />
                                <p>function gettitle()</p>
                            </div> :
                            type === 'review' ?
                                <p>{user_media?.review}</p> :
                                type === 'like' ?
                                    <div>
                                        <img src={''} alt="Affiche de film" />
                                        <p>function gettitle()</p>
                                    </div> : ''
                }
            </div>
        </article>
    )
}