// import Button from "./Button";
import UserWatchlistsContainer from "./UserWatchlistsContainer";
import type { Watchlist } from "../types/api";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import CreateWatchlistModal from "./CreateWatchlistModal";

interface Props {
    watchlists: Watchlist[] | null,
    onSelect: (id: number) => void,
    selectedId: number | null,
    onClose: () => void,
    onValidate: () => void,
    onWatchlistCreated: (watchlist: Watchlist) => void
}

export default function AddWatchlistModal({ watchlists, onSelect, selectedId, onClose, onValidate, onWatchlistCreated }: Props) {

    const [isOpenCreateWatchlistModal, setIsOpenCreateWatchlistModal] = useState(false);

    return (
        <>
            {
                isOpenCreateWatchlistModal && (
                    <CreateWatchlistModal onClose={() => setIsOpenCreateWatchlistModal(false)} onWatchlistCreated={onWatchlistCreated}/>
                )
            }
            <div className="modal-container">
                <div className="add-watchlist-modal">
                    <div className="modal-header">
                        <p>Ajouter à une watchlist</p>
                        <button
                            type="button"
                            className="small-btn red-btn"
                            disabled={false}
                            onClick={() => setIsOpenCreateWatchlistModal(true)}
                        >
                            Créer <CirclePlus className="icone" />
                        </button>
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
        </>
    )
}