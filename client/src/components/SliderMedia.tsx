import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import type { Media } from "../pages/HomepageConnected"
import MediaCard from "./MediaCard"
import type { Genre } from "../types/tmdb"
import { useRef, useState } from "react"

interface Props {
    media: Media[],
    genres: Genre[]
}

export default function SliderMedia({ media, genres }: Props) {

    const [offset, setOffset] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const clickArrowLeft = () => {
        if (!cardRef.current) return;
        const cardWidth = cardRef.current.children[0].getBoundingClientRect().width + 16;
        setOffset(prev => prev + cardWidth);
    }

    const clickArrowRight = () => {
        if (!cardRef.current || !sliderRef.current) return;

        const firstCard = cardRef.current.children[0] as HTMLElement;
        const cardWidth = firstCard.getBoundingClientRect().width + 16;
        const containerVisibleWidth = sliderRef.current.getBoundingClientRect().width;
        const maxOffset = -(media.length * cardWidth - containerVisibleWidth);

        if (offset <= maxOffset) return;
        setOffset(prev => prev - cardWidth);
    };

    return (
        <div className="slider-container" ref={sliderRef}>
            <div className="arrows-container">
                <CircleArrowLeft className="arrow-left" onClick={(offset === 0) ? undefined : () => clickArrowLeft()} />
                <CircleArrowRight className="arrow-right" onClick={() => clickArrowRight()} />
            </div>
            <div ref={cardRef} className="media-card-container" style={{ transform: `translateX(${offset}px)` }}>
                {
                    media.map(m => (
                        <MediaCard key={m.id} id={m.id} title={m.title ?? m.name} poster_path={`${import.meta.env.VITE_API_IMAGE_BASE_URL}/w500${m.poster_path}`} genre_ids={m.genre_ids} genres={genres} media_type={m.media_type} />
                    ))
                }
            </div>
        </div>
    )
}