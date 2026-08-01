import { UserRoundPlus } from "lucide-react";
import type { RecentActivity } from "../../types/api";
import { formatReviewDate } from "../../utils/formatDate";
import { formatUsername } from "../../utils/formatText";

export default function FollowActivityCard({ user_followed, created_at }: RecentActivity) {
    return (
        <article className="recent-activity-card follow-activity-card">
            <div className="header-activity-card">
                <div className="icon-container">
                    <UserRoundPlus className="icon" />
                </div>
                <div className="action-container">
                    <p className="title">A suivi <span>{formatUsername(user_followed?.username)}</span></p>
                    <p className="date">Il y a {formatReviewDate(created_at)}</p>
                </div>
            </div>
            <div className="media-container">
                {/* <img src={``} alt="Affiche du film" loading="lazy"/> */}
                <div>
               
                </div>
            </div>
        </article>
    )

}