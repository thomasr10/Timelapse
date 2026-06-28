import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { formatDate } from "../utils/formatDate";
import { formatUsername } from "../utils/formatText";
import type { RecentActivity, UserRecords } from "../types/api";
import { getUserRecords } from "../api/api";
import WatchlistActivityCard from "../components/UserActivity/WatchlistActivityCard";
import LikeActivityCard from "../components/UserActivity/LikeActivityCard";

export default function Profile() {

    const { user } = useAuth();

    const [userRecords, setUserRecords] = useState<UserRecords | null>(null);

    useEffect(() => {
        getUserRecords()
            .then(data => setUserRecords(data.results));
    }, [])

    return (
        <main className="section-container">
            <section id="user-profile">
                <figure>
                    <img src={user?.profile_picture
                        ?
                        `/img/${user.profile_picture}`
                        :
                        user?.username &&
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username)}&background=111726&color=A9B4C6`
                    } alt="Photo de profil de l'utilisateur" />
                </figure>
                <div className="info-container">
                    <div>
                        <p className="username">{user?.display_username}</p>
                    </div>
                    <div className="flex-row gap-12">
                        <p>{formatUsername(user?.username)}</p>
                        <p>Membre depuis {formatDate(user?.created_at)?.getFullYear()}</p>
                    </div>
                    <div className="flex-row gap-12">
                        <div className="user-info">
                            <span>{userRecords?.watched_medias}<span className="gray-txt">Vus</span></span>
                        </div>
                        <div className="user-info">
                            <span>
                                {userRecords?.followers}
                                <span className="gray-txt">Abonné</span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="recent-activity">
                {   
                    (userRecords !== null && userRecords?.recent_activity !== null) && (
                        userRecords?.recent_activity.map((r: RecentActivity, index: number)=> (
                            r.type === 'watchlist' ? (
                                <WatchlistActivityCard key={index} created_at={r.created_at} media={r.media} watchlist={r.watchlist}/>
                            ) :
                            r.type === 'like' ? (
                                <LikeActivityCard key={index} created_at={r.created_at} media={r.media} watchlist={r.watchlist}/>
                            ) : ''
                        ))

                    )
                }
            </section>
        </main>
    )
}