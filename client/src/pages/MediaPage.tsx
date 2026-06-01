import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMedia, fetchMediaCredits } from "../api/tmdb";
import type { CastMember, CrewMember, Genre } from "../types/tmdb";
import MediaHero from "../components/MediaHero";

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
    director: CrewMember,
    cast: CastMember[],
    release_date: string,
    runtime: number
}

export default function MediaPage() {

    const { type, id } = useParams();
    const [mediaInfos, setMediaInfos] = useState<FullInfoMedia | null>(null);

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

    return (
        <main>
            <img className="backdrop-image" src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w1280${mediaInfos?.backdrop_path}`} alt="" />
            <section className="section-container">
                <MediaHero title={mediaInfos?.title} poster_path={mediaInfos?.poster_path} release_date={mediaInfos?.release_date} genres={mediaInfos?.genres} runtime={mediaInfos?.runtime} />
            </section>

        </main>
    )
}