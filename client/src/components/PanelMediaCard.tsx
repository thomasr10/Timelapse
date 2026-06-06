import { Link } from "react-router-dom";
import type { Media } from "../pages/HomepageConnected";
import { formatDate } from "../utils/formatDate";

interface Props {
    media: Media,
    categorie: string,
    onSelect: () => void,
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function PanelMediaCard({ media, categorie, onSelect, inputRef }: Props) {

    // Empty input + close panel
    const clearInterface = () => {
        onSelect();
        if(inputRef.current) {
            inputRef.current.value = "";
        }
        return;
    }

    return (
        <Link to={`/media/${categorie}/${media.id}`}  onClick={() => clearInterface()}>
            <div className="panel-media-card">
                <img src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}w200/${media.poster_path}`} alt={`Affiche du film ${media.title ? media.title : media.name}`} />
                <div className="infos">
                    <p className="title">
                        {
                            media.title ? media.title : media.name
                        }
                    </p>
                    <p className="date">
                        {
                            media.release_date ? 
                                formatDate(media.release_date)?.getFullYear() : 
                                media.first_air_date ? formatDate(media.first_air_date)?.getFullYear() : 'N/A'
                        }
                    </p>
                </div>
            </div>
        </Link>
    )
}