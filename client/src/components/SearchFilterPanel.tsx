import { useState } from "react"

export default function SearchFilterPanel() {

    const [categorie, setCategorie] = useState("films");



    return (
        <div className="search-panel">
            <div className="results-choice-container">
                <div className="choice-container">
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setCategorie("films")}
                        className={`search-choice-btn ${categorie === "films" ? "focused-btn" : ""}`}
                    >
                        Films
                    </button>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setCategorie("series")}
                        className={`search-choice-btn ${categorie === "series" ? "focused-btn" : ""}`}
                    >
                        Séries
                    </button>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setCategorie("cast")}
                        className={`search-choice-btn ${categorie === "cast" ? "focused-btn" : ""}`}
                    >
                        Cast
                    </button>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setCategorie("users")}
                        className={`search-choice-btn ${categorie === "users" ? "focused-btn" : ""}`}
                    >
                        Utilisateurs
                    </button>
                </div>
                <div className="results-container"></div>
            </div>
        </div>
    )
}