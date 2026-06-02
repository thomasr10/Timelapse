import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMedia, fetchMediaCredits } from "../api/tmdb";
import type { CastMember, CrewMember, Genre } from "../types/tmdb";
import MediaHero from "../components/MediaHero";
import MediaInfo from "../components/MediaInfo";
import MediaCastInfo from "../components/MediaCastInfo";

interface FullInfoMedia {
    id: number,
    title: string,
    genre_ids: number[],
    genres: Genre[] | undefined,
    overview: string,
    poster_path: string,
    budget: number,
    revenue: number,
    backdrop_path: string,
    director: string,
    cast: CastMember[],
    release_date: string,
    runtime: number
}

export default function MediaPage() {

    const { type, id } = useParams();
    const [mediaInfos, setMediaInfos] = useState<FullInfoMedia | null>(null);
    const [maxSlice, setMaxSlice] = useState<number | undefined>(5);
    const [castBtnText, setCastBtnText] = useState("Voir tout le cast");

    useEffect(() => {
        if (!type || !id) return;

        const fetchMediaData = async () => {
            const [movie, credits] = await Promise.all([
                fetchMedia(type, Number(id)),
                fetchMediaCredits(type, Number(id))
            ]);
            setMediaInfos({ ...movie, director: credits.crew.find((p: CrewMember) => p.job === "Director")?.name, cast: credits.cast });
        };

        fetchMediaData();
    }, [type, id]);

    const displayAllCast = () => {

        if (maxSlice === 5) {
            setCastBtnText("Voir moins")
            setMaxSlice(mediaInfos?.cast.length);
        } else {
            setCastBtnText("Voir tout le cast");
            setMaxSlice(5);
        }
    }

    useEffect(() => { console.log(mediaInfos?.cast) }, [mediaInfos])

    return (
        <main>
            <img className="backdrop-image" src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w1280${mediaInfos?.backdrop_path}`} alt="" />
            <section className="section-container">
                <MediaHero
                    title={mediaInfos?.title}
                    poster_path={mediaInfos?.poster_path}
                    release_date={mediaInfos?.release_date}
                    genres={mediaInfos?.genres}
                    runtime={mediaInfos?.runtime}
                />
            </section>
            <section className="media-info-section section-container">
                <section>
                    <MediaInfo
                        director={mediaInfos?.director}
                        release_date={mediaInfos?.release_date}
                        budget={mediaInfos?.budget}
                        revenue={mediaInfos?.revenue}
                    />
                </section>
                <section style={{ marginTop: "2rem" }}>
                    <h2 className="media-detail-h2">Casting</h2>
                    <div className="media-cast-container">
                        {
                            mediaInfos?.cast.slice(0, maxSlice).map((c) => (
                                <MediaCastInfo
                                    key={c.id}
                                    id={c.id}
                                    name={c.name}
                                    character={c.character}
                                    profile_path={c.profile_path}
                                />
                            ))
                        }
                    </div>
                    <div className="btn-container">
                        <button className="main-btn blue-btn full-btn" onClick={() => displayAllCast()}>
                            {castBtnText}
                        </button>
                    </div>
                </section>
            </section>
        </main>
    )
}