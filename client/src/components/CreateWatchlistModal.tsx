import { useState } from "react"
import { createWatchlist } from "../api/api";
import type { Watchlist } from "../types/api";

interface Props {
    onClose: () => void,
    onWatchlistCreated: (watchlist: Watchlist) => void

}

export default function CreateWatchlistModal({ onClose, onWatchlistCreated }: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const onValidate = () => {
        createWatchlist(title, description, isPublic)
            .then(data => onWatchlistCreated(data.results))
        onClose();
    }

    return (
        <div className="modal-container create-watchlist-modal-container">
            <div className="create-watchlist-modal">
                <p className="title">Créer une watchlist</p>
                <div className="flex-col gap-12">
                    <label htmlFor="title">Titre</label>
                    <input id="title" type="text" required placeholder="Comédies" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="flex-col gap-12">
                    <label htmlFor="description">Titre</label>
                    <textarea id="description" placeholder="Quand j'ai envie de rire" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="flex-row gap-12 align-center">
                    <label htmlFor="public">Watchlist publique ?</label>
                    <input id="public" type="checkbox" onChange={() => setIsPublic(!isPublic)}/>
                </div>
                <div className="flex-row gap-16">
                    <button
                        type="button"
                        className={`small-btn red-btn ${title.length === 0 ? 'disabled' : ''}`}
                        disabled={title.length === 0 ? true : false}
                        onClick={() => onValidate()}
                    >
                        Ajouter
                    </button>
                    <button
                        type="button"
                        className={`small-btn grey-btn`}
                        disabled={false}
                        onClick={() => onClose()}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}