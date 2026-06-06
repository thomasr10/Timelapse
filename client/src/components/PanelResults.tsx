import type { Media } from "../pages/HomepageConnected";
import PanelMediaCard from "./PanelMediaCard";

interface Props {
    medias: Media[] | undefined,
    categorie: string,
    onSelect: () => void,
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function PanelResults({ medias, categorie, onSelect, inputRef }: Props) {
    return (
        <div className="panel-results-container">
            {
                medias?.length !== 0 ?
                    medias?.map((media, index) => (
                        <PanelMediaCard key={index} media={media} categorie={categorie} onSelect={onSelect} inputRef={inputRef}/>
                    ))
                    : <p className="no-result">Aucun résultat</p>
            }
        </div>
    )
}