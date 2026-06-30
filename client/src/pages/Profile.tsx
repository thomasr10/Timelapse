import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import { formatUsername } from "../utils/formatText";
import type { ApiMedia, RecentActivity, UserRecords, Watchlist } from "../types/api";
import { fetchUserByUsername, fetchUserWatchlists, fetchWatchlist, getUserRecords } from "../api/api";
import WatchlistActivityCard from "../components/UserActivity/WatchlistActivityCard";
import LikeActivityCard from "../components/UserActivity/LikeActivityCard";
import RateActivityCard from "../components/UserActivity/RateActivityCard";
import ReviewActivityCard from "../components/UserActivity/ReviewActivityCard";
import { fetchMedia } from "../api/tmdb";
import UserWatchlistCard from "../components/UserWatchlistCard";
import { logout } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/auth";

export default function Profile() {

    const { username } = useParams();
    const { user } = useAuth();

    const [userRecords, setUserRecords] = useState<UserRecords | null>(null);
    const [userWatchlists, setUserWatchlists] = useState<Watchlist[] | null>(null);
    const [medias, setMedias] = useState<Record<number, ApiMedia[]> | null>(null);
    const [mediasInfos, setMediasInfos] = useState<Record<number, string[]> | null>(null);
    const [userProfile, setUserProfile] = useState<User | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!username) return;
        fetchUserByUsername(username)
            .then(data => {
                if(data.results === null) {
                    navigate('/');
                }
                console.log(data)
                setUserProfile(data.results)
            });
    }, [username])

    useEffect(() => {
        if (!userProfile) return;
        getUserRecords(userProfile?.id).then(data => setUserRecords(data.results));
        fetchUserWatchlists(userProfile?.id).then(data => setUserWatchlists(data.results));
    }, [userProfile]);

    useEffect(() => {
        if (!userWatchlists) return;

        const loadMedias = async () => {
            const promises = userWatchlists.map(w =>
                fetchWatchlist(w.id).then(res => ({
                    watchlistId: w.id,
                    medias: res.results.medias
                }))
            );

            const results = await Promise.all(promises);

            const grouped: Record<number, ApiMedia[]> = {};
            results.forEach(r => {
                grouped[r.watchlistId] = r.medias;
            });

            setMedias(grouped);
        };

        loadMedias();
    }, [userWatchlists]);

    useEffect(() => {
        if (!medias) return;

        const loadMediasInfos = async () => {
            const groupedInfos: Record<number, string[]> = {};

            for (const watchlistIdStr in medias) {
                const watchlistId = Number(watchlistIdStr);
                const mediaList = medias[watchlistId];

                if (!mediaList) continue;

                const promises = mediaList.slice(0, 4).map(m =>
                    fetchMedia(m.type, Number(m.tmdb_id))
                );

                const results = await Promise.all(promises);
                groupedInfos[watchlistId] = results.map(r => r.poster_path);
            }

            setMediasInfos(groupedInfos);
        };

        loadMediasInfos();
    }, [medias]);

    const handleLogout = () => {
        logout()
        window.location.reload()
    }


    return (
        <main id="profile" className="section-container">
            <section id="user-profile">
                <figure>
                    <img
                        src={
                            userProfile?.profile_picture
                                ? `/img/${userProfile.profile_picture}`
                                : userProfile?.username &&
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.username)}&background=111726&color=A9B4C6`
                        }
                        alt="Photo de profil de l'utilisateur"
                    />
                </figure>

                <div className="info-container">
                    <div className="flex-row gap-12 align-center">
                        <p className="username">{userProfile?.display_username}</p>
                        {
                            user?.id === userProfile?.id ?
                                <button
                                    className="small-btn red-btn btn"
                                    onClick={() => handleLogout()}
                                >Déconnexion
                                </button>
                                : ""
                        }
                    </div>

                    <div className="flex-row gap-12">
                        <p>{formatUsername(userProfile?.username)}</p>
                        <p>Membre depuis {formatDate(userProfile?.created_at)?.getFullYear()}</p>
                    </div>

                    <div className="flex-row gap-12">
                        <div className="user-info">
                            <span>
                                {userRecords?.watched_medias}
                                <span className="gray-txt">Vus</span>
                            </span>
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
            <section>
                <h2>Activité récente</h2>

                <section id="recent-activity">
                    {userRecords?.recent_activity?.map((r: RecentActivity, index: number) => (
                        r.type === 'watchlist' ? (
                            <WatchlistActivityCard key={index} created_at={r.created_at} media={r.media} watchlist={r.watchlist} />
                        ) : r.type === 'like' ? (
                            <LikeActivityCard key={index} created_at={r.created_at} media={r.media} />
                        ) : r.type === 'rate' ? (
                            <RateActivityCard key={index} created_at={r.created_at} media={r.media} user_media={r.user_media} />
                        ) : r.type === 'review' ? (
                            <ReviewActivityCard key={index} created_at={r.created_at} media={r.media} review={r.review} />
                        ) : null
                    ))}
                </section>
            </section>
            <section id="users-watchlists">
                <h2>Mes watchlists</h2>
                <section>
                    {userWatchlists?.map((w) => (
                        user?.id === userProfile?.id ?
                            <UserWatchlistCard
                                key={w.id}
                                title={w.title}
                                items={w.count_media}
                                updated_at={w.updated_at}
                                poster_paths={mediasInfos?.[w.id] ?? []}
                                id={w.id}
                                userProfileId={userProfile?.id}
                                currentUserId={user?.id}
                            /> : w.is_public ?
                                <UserWatchlistCard
                                    key={w.id}
                                    title={w.title}
                                    items={w.count_media}
                                    updated_at={w.updated_at}
                                    poster_paths={mediasInfos?.[w.id] ?? []}
                                    id={w.id}
                                    userProfileId={userProfile?.id}
                                    currentUserId={user?.id}
                                /> : ''
                    ))}
                </section>
            </section>
        </main>
    );
}
