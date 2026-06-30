import type { Media } from "../pages/HomepageConnected";
import type { User } from "../types/auth";
import PanelMediaCard from "./PanelMediaCard";
import PanelUserCard from "./PanelUserCard";

interface Props {
    medias?: Media[] | undefined,
    users?: User[] | undefined,
    categorie: string,
    onSelect: () => void,
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function PanelResults({ medias, categorie, onSelect, inputRef, users }: Props) {
    return (
        <div className="panel-results-container">
            {categorie === "users" ? (
                users?.length !== 0 ?
                    users?.map((user, index) => (
                        <PanelUserCard key={index} user={user} onSelect={onSelect} inputRef={inputRef} categorie={categorie} />
                    )) : <p className="no-result">Aucun résultat</p>
            ) : (
                medias?.length !== 0 ?
                    medias?.map((media, index) => (
                        <PanelMediaCard key={index} media={media} categorie={categorie} onSelect={onSelect} inputRef={inputRef} />
                    )) : <p className="no-result">Aucun résultat</p>
            )}
        </div>
    )
}