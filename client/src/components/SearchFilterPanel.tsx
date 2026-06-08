import type React from "react"
import type { Media } from "../pages/HomepageConnected"
import PanelResults from "./PanelResults"

interface Props {
    categorie: string,
    setCategorie: React.Dispatch<React.SetStateAction<string>>,
    medias: Media[] | undefined,
    onSelect: () => void,
    inputRef: React.RefObject<HTMLInputElement | null>
}

export default function SearchFilterPanel({ categorie, setCategorie, medias, onSelect, inputRef }: Props) {

    return (
        <div className="search-panel">
            <div className="results-choice-container">
                <div className="choice-container">
                    <button
                        value="movie"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "movie" ? "focused-btn" : ""}`}
                    >
                        Films
                    </button>
                    <button
                        value="tv"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "tv" ? "focused-btn" : ""}`}
                    >
                        Séries
                    </button>
                    <button
                        value="cast"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "cast" ? "focused-btn" : ""}`}
                    >
                        Cast
                    </button>
                    <button
                        value="users"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => setCategorie((e.target as HTMLButtonElement).value)}
                        className={`search-choice-btn ${categorie === "users" ? "focused-btn" : ""}`}
                    >
                        Utilisateurs
                    </button>
                </div>
                <PanelResults medias={medias} categorie={categorie} onSelect={onSelect} inputRef={inputRef}/>
            </div>
        </div>
    )
}