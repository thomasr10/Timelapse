// import Button from "./Button";
import UserWatchlistsContainer from "./UserWatchlistsContainer";
import type { Watchlist } from "../types/api";
// import { CirclePlus } from "lucide-react";

interface Props {
    watchlists: Watchlist[] | null,
    onSelect: (id: number) => void,
    selectedId: number | null,
    onClose: () => void,
    onValidate: () => void
}

export default function AddWatchlistModal({ watchlists, onSelect, selectedId, onClose, onValidate}: Props) {

    return (
        <div className="modal-container">
            <div className="add-watchlist-modal">
                <div className="modal-header">
                    <p>Ajouter à une watchlist</p>
                    {/* <Button
                        type="button"
                        className="small-btn red-btn"
                        disabled={false}
                    >
                        Créer <CirclePlus className="icone" />
                    </Button> */}
                </div>
                <UserWatchlistsContainer watchlists={watchlists} onSelect={onSelect} selectedId={selectedId} />
                <div className="btn-container">
                    <button
                        type="button"
                        className={`small-btn red-btn ${selectedId === null ? 'disabled' : ''}`}
                        disabled={selectedId === null ? true : false}
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