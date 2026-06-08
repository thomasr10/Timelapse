import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMedia, fetchMediaCredits } from "../api/tmdb";
import type { CastMember, CrewMember, Genre } from "../types/tmdb";
import MediaHero from "../components/MediaHero";
import MediaInfo from "../components/MediaInfo";
import MediaCastInfo from "../components/MediaCastInfo";
import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";
import type { UserMedia } from "../types/api";
import { fetchUserMediaData } from "../api/api";

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
}

export default function MediaPage() {

    const { type, id } = useParams();
    const [mediaInfos, setMediaInfos] = useState<FullInfoMedia | null>(null);
    const [maxSlice, setMaxSlice] = useState(5);
    const [castBtnText, setCastBtnText] = useState("Voir plus");
    const [userMedia, setUserMedia] = useState<UserMedia | null>(null);

    const { startFetch, endFetch, loadingCount } = useLoader();

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

    const displayAllCast = () => {
        if (!mediaInfos) return;

        const total = mediaInfos.cast.length;
        const remaining = total - maxSlice;

        if (remaining >= 5) {
            const newSlice = maxSlice + 5;
            setMaxSlice(newSlice);
            setCastBtnText(newSlice >= total ? "Voir moins" : "Voir plus");
        } else {
            setCastBtnText("Voir plus");
            setMaxSlice(5);
        }
    }

    return (
        <>
            {loadingCount > 0 ? <Loader /> : (
                <>
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
                            />
                        </section>
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
                                <button className="main-btn blue-btn full-btn" onClick={() => displayAllCast()}>
                                    {castBtnText}
                                </button>
                            </div>
                        </section>
                        <section className="section-review">
                        </section>
                    </main>
                </>
            )}
        </>
    )
}