import type { Watchlist } from "../types/api";
import Button from "./Button";

interface Props {
    watchlists: Watchlist[] | null,
    onSelect: (id: number) => void,
    selectedId: number | null
}

export default function UserWatchlistsContainer({ watchlists, onSelect, selectedId }: Props) {

    return (
        <div className="user-watchlists-container">
            {
                watchlists ?
                    watchlists.map(w => (
                        <div className={`watchlist-container ${selectedId === w.id ? 'selected' : ''}`} key={w.id} onClick={() => onSelect(w.id)}>
                            <p className="title">{ w.title }</p>
                            <p className="description">{ w.description }</p>
                        </div>
                    ))
                    :
                    <div>
                        <p>Pas encore de Watchlist ? Créez en une</p>
                        <Button
                            type="button"
                            className="main-btn"
                            disabled={false}
                        >
                            Créer une Watchlist
                        </Button>
                    </div>
            }
        </div>
    )
}