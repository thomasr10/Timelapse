import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import { formatUsername } from "../utils/formatText";
import type { ApiMedia, RecentActivity, UserRecords, Watchlist } from "../types/api";
import { deleteAccount, fetchUserByUsername, fetchUserWatchlists, fetchWatchlist, follow, getUserRecords, isFollowing, unfollow, updateUser } from "../api/api";
import WatchlistActivityCard from "../components/UserActivity/WatchlistActivityCard";
import LikeActivityCard from "../components/UserActivity/LikeActivityCard";
import RateActivityCard from "../components/UserActivity/RateActivityCard";
import ReviewActivityCard from "../components/UserActivity/ReviewActivityCard";
import { fetchMedia } from "../api/tmdb";
import UserWatchlistCard from "../components/UserWatchlistCard";
import { logout } from "../api/auth";
import { useNavigate, useParams } from "react-router-dom";
import type { User } from "../types/auth";
import { Check, PlusCircle } from "lucide-react";
import FollowActivityCard from "../components/UserActivity/FollowActivityCard";

export default function Profile() {

    const { username } = useParams();
    const { user } = useAuth();

    const [userRecords, setUserRecords] = useState<UserRecords | null>(null);
    const [userWatchlists, setUserWatchlists] = useState<Watchlist[] | null>(null);
    const [medias, setMedias] = useState<Record<number, ApiMedia[]> | null>(null);
    const [mediasInfos, setMediasInfos] = useState<Record<number, string[]> | null>(null);
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [isFollowed, setIsFollowed] = useState(false);

    const [email, setEmail] = useState(user?.email);
    const [display_username, setDisplayUsername] = useState(user?.display_username);
    const [password, setPassword] = useState('');

    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    // fetch user data
    useEffect(() => {
        if (!username) return;
        fetchUserByUsername(username)
            .then(data => {
                if (data.results === null) {
                    navigate('/');
                }
                setUserProfile(data.results)
            });
    }, [username]);

    useEffect(() => {
        if (!userProfile) return;
        isFollowing(userProfile.id)
            .then(data => {
                setIsFollowed(data.results);
            });
    }, [userProfile, user])

    // fetch user activity
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


    // déconnexion
    const handleLogout = () => {
        logout()
        navigate(0);
    }

    // follow
    const handleFollow = () => {
        if (!userProfile) return;
        follow(userProfile.id)
            .then(() => setIsFollowed(true));
    }

    const handleUnfollow = () => {
        if (!userProfile) return;
        unfollow(userProfile.id)
            .then(() => setIsFollowed(false));
    }

    const handleDeleteAccount = () => {
        if (!user) return;
        deleteAccount();
        navigate(0);
    }

    const handleUpdateUser = (email: string | undefined, display_username: string | undefined, password?: string | undefined) => {
        console.log(email, display_username, password)
        updateUser(email, display_username  , password)
            .then((data) => {
                console.log(data);
                refreshUser();
            })
        alert('Modifications enregistrée !');
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
                        loading="lazy"
                    />
                </figure>

                <div className="info-container">
                    <div className="flex-row gap-12 align-center">
                        <p className="username">{userProfile?.display_username}</p>
                        {
                            user?.id === userProfile?.id ?
                                <button
                                    className="small-btn red-btn btn"
                                    onClick={() => handleLogout()}>
                                    Déconnexion
                                </button>
                                :
                                !isFollowed ?
                                    <button
                                        className="small-btn red-btn btn"
                                        onClick={() => handleFollow()}>
                                        Suivre
                                        <PlusCircle className="icon-btn" />
                                    </button> :
                                    <button
                                        className="small-btn blue-btn btn"
                                        onClick={() => handleUnfollow()}>
                                        Suivi
                                        <Check className="icon-btn" />
                                    </button>
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
                        ) : r.type === 'follow' ? (
                            <FollowActivityCard key={index} created_at={r.created_at} user_followed={r.user_followed} />
                        ) : null
                    ))}
                </section>
            </section>
            <section id="users-watchlists">
                <h2>Mes watchlists</h2>
                <section>
                    {userWatchlists?.map((w, index) => (
                        user?.id === userProfile?.id ?
                            <UserWatchlistCard
                                key={index}
                                title={w.title}
                                items={w.count_media}
                                updated_at={w.updated_at}
                                poster_paths={mediasInfos?.[w.id] ?? []}
                                id={w.id}
                                userProfileId={userProfile?.id}
                                currentUserId={user?.id}
                                userWatchlists={userWatchlists}
                                onDelete={setUserWatchlists}
                            /> : w.is_public ?
                                <UserWatchlistCard
                                    key={index}
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
            {user?.id === userProfile?.id &&
                <section className="mt-32">
                    <h2>Paramètres du compte</h2>
                    <section id="user-settings" className="mt-24">
                        {
                            isDeleteAccountModalOpen &&
                            <div className="modal-container">
                                <div className="modal">
                                    <p className="title">Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                                    <p className="mt-24">Cette action est irréversible.</p>
                                    <div className="flex-row align-center justify-center gap-24 mt-32">
                                        <button onClick={() => setIsDeleteAccountModalOpen(false)} className="btn small-btn grey-btn">Fermer</button>
                                        <button onClick={() => handleDeleteAccount()} className="btn small-btn red-btn">Supprimer mon compte</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateUser(email, display_username, password) 
                        }} id="user-profile-form" className="flex-col gap-24">
                            <div className="flex-col gap-12">
                                <label htmlFor="email">Votre adresse mail</label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex-col gap-12">
                                <label htmlFor="display_username">Votre nom d'utilisateur</label>
                                <input id="display_username" type="display_username" value={display_username} onChange={(e) => setDisplayUsername(e.target.value)} />
                            </div>
                            <div className="flex-col gap-12">
                                <label htmlFor="password">Votre mot de passe</label>
                                <input id="password" type="password" placeholder="Modifiez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="center">
                                <input type="submit" className="btn small-btn red-btn center" />
                            </div>
                        </form>
                        <div className="flex-col justify-center align-center mt-32">
                            <button onClick={() => setIsDeleteAccountModalOpen(true)} className="txt-btn">Supprimer mon compte</button>
                        </div>
                    </section>
                </section>

            }
        </main>
    );
}
