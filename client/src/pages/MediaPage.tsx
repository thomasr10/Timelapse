import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMedia, fetchMediaCredits } from "../api/tmdb";
import type { CastMember, CrewMember, Genre } from "../types/tmdb";
import MediaHero from "../components/MediaHero";
import MediaInfo from "../components/MediaInfo";
import MediaCastInfo from "../components/MediaCastInfo";
import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";
import { type Watchlist, type UserMedia, type Review } from "../types/api";
import { fetchReviews, fetchUserMediaData, fetchUserWatchlists, registerReview } from "../api/api";
import { CirclePlus } from "lucide-react";
import ReviewCard from "../components/ReviewCard";
import ReviewModal from "../components/ReviewModal";

interface FullInfoMedia {
    id: number,
    title?: string,
    name?: string,
    genre_ids: number[],
    genres: Genre[] | undefined,
    overview: string,
    poster_path: string,
    budget: number,
    revenue: number,
    backdrop_path: string,
    director?: string,
    cast: CastMember[],
    release_date?: string,
    first_air_date?: string
    runtime?: number,
    number_of_seasons?: number,
    status: string,
    vote_average: number | null
}

export default function MediaPage() {

    const { type, id } = useParams();
    const [mediaInfos, setMediaInfos] = useState<FullInfoMedia | null>(null);
    const [maxSlice, setMaxSlice] = useState(5);
    const [castBtnText, setCastBtnText] = useState("Voir plus");
    const [userMedia, setUserMedia] = useState<UserMedia | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [userWatchlists, setUserWatchlists] = useState<Watchlist[] | null>(null);
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [offset, setOffset] = useState(0);
    const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
    const [reviewValue, setReviewValue] = useState("");

    const { startFetch, endFetch, loadingCount } = useLoader();


    // Récupérer les watchlists du user
    useEffect(() => {
        fetchUserWatchlists()
            .then((data) => setUserWatchlists(data.results));
    }, []);

    // Récupérer reviews
    useEffect(() => {
        if (!type || !id) return;
        if (offset === 0) {
            fetchReviews(type, Number(id), offset)
                .then((data) => { setReviews(data.results) });
        } else {
            fetchReviews(type, Number(id), offset)
                .then((data) => { setReviews(prev => prev + data.results) });
        }
    }, []);

    useEffect(() => {
        if (!type || !id) return;
        startFetch();
        const fetchMediaData = async () => {
            const [movie, credits, userMediaData] = await Promise.all([
                fetchMedia(type, Number(id)),
                fetchMediaCredits(type, Number(id)),
                fetchUserMediaData(Number(id), type)
            ]);
            setMediaInfos({
                ...movie, director: type === 'movie' ?
                    credits.crew.find((p: CrewMember) => p.job === "Director")?.name :
                    movie.created_by[0]?.name
                , cast: credits.cast
            });
            setUserMedia(userMediaData.results);
        };

        fetchMediaData()
            .finally(() => endFetch());
    }, [type, id]);

    useEffect(() => {
        if (!mediaInfos) return;
        const isDisabled = mediaInfos.cast.length > 5;
        setDisabled(!isDisabled);
    }, [mediaInfos]);

    const displayAllCast = () => {
        if (!mediaInfos) return;

        const total = mediaInfos.cast.length;
        const remaining = total - maxSlice;

        if (remaining > 5) {
            const newSlice = maxSlice + 5;
            setMaxSlice(newSlice);
        } else if (remaining <= 5 && remaining > 0) {
            setCastBtnText("Voir moins")
            const newSlice = total;
            setMaxSlice(newSlice);
        } else {
            setMaxSlice(5);
            setCastBtnText("Voir plus")
        }
    }

    const postReview = async (review: string) => {
        if (!review || !id || !type) return;
        registerReview(review, Number(id), type)
            .then(() => {
                setIsOpenReviewModal(false);
                window.location.reload();
            })
    }

    return (
        <>
            {loadingCount > 0 ? <Loader /> : (
                <>
                    {
                        isOpenReviewModal && (
                            <ReviewModal value={reviewValue} onchange={setReviewValue} onclick={() => postReview(reviewValue)} onclose={() => setIsOpenReviewModal(false)} />
                        )
                    }
                    {mediaInfos?.backdrop_path
                        ? <img className="backdrop-image"
                            src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}original${mediaInfos?.backdrop_path}`}
                            alt={`Image de fond de ${mediaInfos?.title}`}
                        />
                        : <div className="backdrop-image-replacement"></div>
                    }
                    <main className="section-container media-page">
                        <section className="section-media-hero">
                            <MediaHero
                                title={mediaInfos?.title ?? mediaInfos?.name}
                                poster_path={mediaInfos?.poster_path}
                                release_date={(mediaInfos?.release_date) ? mediaInfos.release_date : mediaInfos?.first_air_date}
                                genres={mediaInfos?.genres}
                                runtime={mediaInfos?.runtime}
                                number_of_seasons={mediaInfos?.number_of_seasons}
                                overview={mediaInfos?.overview}
                                type={type}
                                id={Number(id)}
                                userMedia={userMedia}
                                userWatchlists={userWatchlists}
                                vote_average={mediaInfos?.vote_average}
                            />
                        </section>
                        <section id="review-description">
                            <section className="section-media-description">
                                <h2 className="media-detail-h2">Description</h2>
                                <p>{mediaInfos?.overview}</p>
                            </section>
                            <section className="section-review">
                                <div className="flex-row justify-between align-center">
                                    <h2 className="media-detail-h2">Reviews</h2>
                                    <button
                                        className="add-review-btn flex-row align-center"
                                        onClick={() => setIsOpenReviewModal(true)}
                                    >
                                        Ajouter une review
                                        <CirclePlus className="icon" />
                                    </button>
                                </div>
                                <div className="reviews-container padding-top-24 padding-bot-24 flex-col gap-16">
                                    {
                                        reviews !== null ? (
                                            reviews.map((r: Review, index: number) => (
                                                <ReviewCard key={index} username={r.user.display_username} profile_picture={r.user.profile_picture} note={r.user_media.rating} date={r.created_at} content={r.content} likes={5.4} />
                                            ))
                                        ) :
                                            <p className="no-review-txt">Aucune review</p>

                                    }
                                </div>
                                {
                                    reviews !== null && (
                                        <div className="flex-row justify-center mt-24">
                                            <button className="red-btn main-btn full-btn-resizable" onClick={() => setOffset(prev => prev + 1)}>
                                                Voir plus
                                            </button>
                                        </div>
                                    )
                                }
                            </section>
                        </section>
                        <section className="flex-col gap-32">
                            <section className="section-media-info">
                                <MediaInfo
                                    director={mediaInfos?.director}
                                    release_date={(mediaInfos?.release_date) ? mediaInfos.release_date : mediaInfos?.first_air_date}
                                    budget={mediaInfos?.budget}
                                    revenue={mediaInfos?.revenue}
                                    type={type}
                                    status={mediaInfos?.status}
                                    number_of_seasons={mediaInfos?.number_of_seasons}
                                />
                            </section>
                            <section className="section-cast-info">
                                <h2 className="media-detail-h2">Casting</h2>
                                <div className="media-cast-container">
                                    {mediaInfos?.cast.slice(0, maxSlice).map((c) => (
                                        <MediaCastInfo
                                            key={c.id}
                                            id={c.id}
                                            name={c.name}
                                            character={c.character}
                                            profile_path={c.profile_path}
                                        />
                                    ))}
                                </div>
                                <div className="btn-container">
                                    <button
                                        className="main-btn blue-btn full-btn"
                                        onClick={() => displayAllCast()}
                                        disabled={disabled}
                                    >
                                        {castBtnText}
                                    </button>
                                </div>
                            </section>
                        </section>
                    </main>
                </>
            )}
        </>
    )
}